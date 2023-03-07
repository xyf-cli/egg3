/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1678072693727_7490';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.middleware = [ 'errorHandler' ];

  config.mysql = {
    // 单数据库信息配置
    client: {
    // host
      host: 'abc.com',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'xxx',
      // 数据库名
      database: 'dbname',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
    expiredTime: '30', // 过期时间(天)
  };

  return {
    ...config,
    ...userConfig,
  };
};
