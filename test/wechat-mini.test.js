'use strict';

const mock = require('egg-mock');

describe('test/wechat-mini.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/wechat-mini-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, wechatMini')
      .expect(200);
  });
});
