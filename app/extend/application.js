'use strict';

const WX_MINI = Symbol('Application#WX_MINI');

const createClient = require('../../lib/createClient');

module.exports = {
  get wechatMini() {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[WX_MINI]) {
      this[WX_MINI] = createClient(this);
    }
    return this[WX_MINI];
  },
};
