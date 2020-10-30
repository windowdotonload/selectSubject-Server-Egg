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
  config.keys = appInfo.name + '_1603096532517_1475';

  config.security = {
    csrf: {
      enable: false,
    },
  },

    // 配置egg-mysql
    config.mysql = {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'select-topic',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    };

  // 配置egg-sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'select-topic',
    username: "root",
    password: "123456"
  };

  // 配置session
  config.session = {
    maxAge: 3600000,
    encrypt: true,
    renew: true
  }
  // 配置上传文件
  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    whitelist() {
      return true;
    },
  };
  // add your middleware config here
  config.middleware = ['auth'];

  config.auth = {
    // ignore: '/login'
    ignore(ctx) {
      if (ctx.request.url === '/login' || ctx.request.url === '/receiveFile' || ctx.request.url === '/test') {
        return true
      }
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
