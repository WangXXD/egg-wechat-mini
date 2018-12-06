# egg-wechat-mini

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-wechat-mini.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-wechat-mini
[travis-image]: https://img.shields.io/travis/eggjs/egg-wechat-mini.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-wechat-mini
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-wechat-mini.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-wechat-mini?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-wechat-mini.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-wechat-mini
[snyk-image]: https://snyk.io/test/npm/egg-wechat-mini/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-wechat-mini
[download-image]: https://img.shields.io/npm/dm/egg-wechat-mini.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-wechat-mini

<!--
Description here.
-->

## Install

```bash
$ npm i egg-wechat-mini --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.wechatMini = {
  enable: true,
  package: 'egg-wechat-mini',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.wechatMini = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
