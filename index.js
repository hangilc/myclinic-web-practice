"use strict";

var web = require("myclinic-web");
var ejs = require("ejs");

exports.run = function(config, subs){
	web.server.run(config, subs);
};

