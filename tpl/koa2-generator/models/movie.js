"use strict";

/**
 * Created by alfred on {{created_at}}.
 */

const Sequelize = require('sequelize')

var connection = require('../../db')

var {{entity}} = connection.define('{{model}}', 
  {{{mongoose_attrs}}}
, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = {{entity}};