'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    // const studentSchema = require('./schema/record.js')(app)

    const student = app.model.define('student', {
        username: STRING,
        password: STRING,
        studentname: STRING,
        studentage: INTEGER,
        gender: STRING,
        specialized_subject: STRING,
        calssname: STRING,
        studentnumber: INTEGER,
        political_status: STRING,
        ethnic_groups: STRING,
        select_teacher: STRING,
        select_subject: STRING,
        record: STRING
    }, {
        tableName: 'student'
    });


    return student;
};