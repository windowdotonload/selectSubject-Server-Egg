'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const teacherSchema = require('./schema/teacher.js')(app)

    const teacher = app.model.define('teacher', teacherSchema, {
        tableName: 'teacher'
    });

    return teacher;
};