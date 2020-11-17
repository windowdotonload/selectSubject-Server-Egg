'use strict';

const { sequelize } = require("../../config/plugin");


module.exports = app => {
    const { Sequelize } = app
    const applyhistorySchema = require('./schema/applyhistory.js')(app)

    const applyhistory = app.model.define('applyhistory', applyhistorySchema, {
        tableName: 'applyhistory'
    });



    return applyhistory;
};
