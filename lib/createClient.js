'use strict';

const crypto = require('crypto');

class wechatMiniClient {
  constructor(app) {
    this.app = app;
    this.appId = app.config.wechatMini.appId;
    this.appSecret = app.config.wechatMini.appSecret;
  }

  async code2Session(code) {
    const { data } = await this.app.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: 'json',
    });
    if (data.errcode) {
      throw new Error(data.errmsg);
    }
    return data;
  }

  async getAccessToken() {
    const token = await this.app.redis.get(`str:accessToken:${this.appId}`);
    if (token) {
      return token;
    }
    const { data } = await this.app.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`, { dataType: 'json' });
    if (data.errcode) {
      throw new Error(data.errmsg);
    }
    await this.app.redis.set(`str:accessToken:${this.appId}`, data.access_token, 'EX', data.expires_in - 60);
    return data.access_token;
  }

  async getWXACodeUnlimit(data) {
    const token = await this.getAccessToken();
    const result = await this.app.curl(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`, {
      method: 'POST',
      data: JSON.stringify(data),
    });
    return result.data;
  }

  async createActivityId() {
    const token = await this.getAccessToken();
    const result = await this.app.curl(`https://api.weixin.qq.com/cgi-bin/message/wxopen/activityid/create?access_token=${token}`, { dataType: 'json' });
    if (result.data.errcode) {
      throw new Error(result.data.errmsg);
    }
    return result.data.activity_id;
  }

  async setUpdatableMsg(data) {
    const token = await this.getAccessToken();
    const result = await this.app.curl(`https://api.weixin.qq.com/cgi-bin/message/wxopen/updatablemsg/send?access_token=${token}`, {
      method: 'POST',
      contentType: 'json',
      data,
      dataType: 'json',
    });
    return result.data;
  }

  decryptData(sessionKey, encryptedData, iv) {
    // base64 decode
    sessionKey = new Buffer(sessionKey, 'base64');
    encryptedData = new Buffer(encryptedData, 'base64');
    iv = new Buffer(iv, 'base64');
    let decoded;
    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer');
    }
    return decoded;
  }
}

module.exports = app => new wechatMiniClient(app);
