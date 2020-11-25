/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

'use strict';

module.exports = app => {
    const { Sequelize } = app
    const { STRING, INTEGER, DATE } = app.Sequelize;
    return {
        title_name: STRING,
        title_description: INTEGER
    };
};

