'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { Sequelize } = app
    const titleSchema = require('./schema/title.js')(app)

    const { STRING, INTEGER, DATE } = app.Sequelize;

    const title = app.model.define('title', titleSchema, {
        tableName: 'title'
    });


    return title;
};