"use strict";

var app = require("./index");
var Config = require("myclinic-config");
var path = require("path");
var program = require("commander");

program
	.option("-c, --config <configpath>", "Read configuration", process.env.MYCLINIC_CONFIG)
	.option("-s, --service <service-url>", "Set service server", "http://localhost:9000/service")
	.option("-p, --port <port>", "Set listening port", 9001)
	.parse(process.argv);

var config = Config.read(program.config);
config._web = {
	"service-url": program.service,
	"port": program.port
};

app.run(config);

