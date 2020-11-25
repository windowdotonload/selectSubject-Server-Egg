/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { Sequelize } = app
    const stucustomtitleSchema = require('./schema/stucustomtitle.js')(app)

    const stucustomtitle = app.model.define('student-custom-title', stucustomtitleSchema, {
        tableName: 'student-custom-title'
    });



    return stucustomtitle;
};
