'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const tTrSchema = require('./schema/teaTOrec.js')(app)

    const tTr = app.model.define('teacher-to-record', tTrSchema, {
        tableName: 'teacher-to-record'
    });

    return tTr;
};