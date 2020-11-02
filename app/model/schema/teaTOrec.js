'use strict';

module.exports = app => {
    const { Sequelize } = app
    const { STRING, INTEGER, DATE } = app.Sequelize;
    return {
        teacherid: INTEGER,
        recordid: INTEGER,
    };
};
