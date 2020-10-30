'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { Sequelize } = app
    const recordSchema = require('./schema/record.js')(app)

    const { STRING, INTEGER, DATE } = app.Sequelize;

    // const record = app.model.define('record', {
    //     recordname: STRING,
    //     deadline: DATE,
    //     studentnumber: INTEGER,
    //     teachernumber: INTEGER
    // }, {
    //     tableName: 'record'
    // });
    const record = app.model.define('record', recordSchema, {
        tableName: 'record'
    });


    return record;
};