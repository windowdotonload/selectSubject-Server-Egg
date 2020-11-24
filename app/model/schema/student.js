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

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    return {
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
        recordto: STRING,
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
    };
};
