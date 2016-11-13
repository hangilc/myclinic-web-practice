"use strict";

var web = require("myclinic-web");

exports.run = function(config, subs){
	web.server.run(config, subs);
};

