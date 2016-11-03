"use strict";

var app = require("./index");
var Config = require("myclinic-config");
var path = require("path");
var program = require("commander");

program
	.option("-c, --config <configpath>", "Read configuration")
	.option("-s, --service <service-url>", "Set service server")
	.option("-p, --port <port>", "Set listening port")
	.parse(process.argv);

var config = {};

if( program.config ){
	Config.extend(config, Config.read(program.config));
} else {
	Config.extend(config, Config.read(path.join(process.env.MYCLINIC_CONFIG, "practice")));
}
if( program.service ){
	config["service-url"] = program.service;
} else {
	config["service-url"] = process.env.MYCLINIC_SERVER;
}
if( program.port ){
	config.port = program.port;
}

app.run(config);

