"use strict";

/**
 * Created by alfred on {{created_at}}.
 */

var T = require("toshihiko");

const Toshihiko = require('toshihiko')

var connection = require('../../db')

var {{entity}} = connection.define('{{model}}', 
  {{{mongoose_attrs}}}
);

module.exports = {{entity}};