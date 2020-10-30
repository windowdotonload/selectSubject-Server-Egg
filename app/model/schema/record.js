'use strict';

module.exports = app => {
    const { Sequelize } = app
    const { STRING, INTEGER, DATE } = app.Sequelize;
    return {
        recordname: STRING,
        deadline: DATE,
        studentnumber: INTEGER,
        teachernumber: INTEGER
    };
};
