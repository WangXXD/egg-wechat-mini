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
