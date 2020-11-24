/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { Sequelize } = app
    const recordMessageSchema = require('./schema/recordmessage.js')(app)

    const { STRING, INTEGER, DATE } = app.Sequelize;


    const recordMessage = app.model.define('record-message', recordMessageSchema, {
        tableName: 'record-message'
    });

    return recordMessage;
};
