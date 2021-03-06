/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
'use strict';

/** @type Egg.EggPlugin */
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.elasticsearch = {
  enable: true,
  package: 'egg-es',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};