
'use strict';

module.exports = app => {
    const { Sequelize } = app
    const { STRING, INTEGER, DATE } = app.Sequelize;
    return {
        content: STRING,
        studentid: INTEGER
    };
};
