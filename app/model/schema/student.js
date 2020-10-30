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
        select_subject: STRING,
        record: STRING
    };
};
