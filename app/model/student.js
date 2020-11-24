/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
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
        titleid: INTEGER,
        select_subject: STRING,
        select_title_status: INTEGER,
        recordto: INTEGER,
        status: INTEGER,
        teacherid: INTEGER,
        canselect: INTEGER,
        loginauth: INTEGER,
        ifcustom: INTEGER,
        title_name: STRING,
        title_description: STRING,
        custom_title_status: INTEGER,
        change_title_number: INTEGER,
        score: STRING,
        sendmessage: INTEGER,
        receiveteamessage: INTEGER,
    }, {
        tableName: 'student'
    });

    student.associate = function () {
        app.model.Student.belongsTo(app.model.Record, { foreignKey: 'recordto' });
    }
    return student;
};