'use strict';

const WX_MINI = Symbol('Application#WX_MINI');

const wechatMiniClient = require('../../lib/createClient');

module.exports = {
  get wechatMini() {
    if (!this[WX_MINI]) {
      this[WX_MINI] = new wechatMiniClient(this);
    }
    return this[WX_MINI];
  },
  get WechatMiniClass() {
    return wechatMiniClient;
  },
};
