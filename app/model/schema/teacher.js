'use strict';

module.exports = app => {
    const { Sequelize } = app
    const { STRING, INTEGER, DATE } = app.Sequelize;
    return {
        username: STRING,
        password: STRING,
        teachername: STRING,
        specialized_subject: STRING,
        titlenumber: INTEGER,
        phonenumber: STRING,
        tecentqnumber: STRING,
        professional: STRING,
        status: INTEGER
    };
};
