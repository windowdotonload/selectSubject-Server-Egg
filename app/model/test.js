'use strict';

const { sequelize } = require("../../config/plugin");

module.exports = app => {
    const { Sequelize } = app
    const { STRING, INTEGER, DATE } = app.Sequelize;

    //如果指定了第三个参数，那么第一个参数写为' '也可以
    const admin = app.model.define('admin', {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        tableName: 'admin'
    });


    return admin;
};