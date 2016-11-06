"use strict";

var app = require("./index");
var Config = require("myclinic-config");
var path = require("path");
var program = require("commander");
var fs = require("fs");
var mkdirp = require("mkdirp");

function toInt(val){
	return parseInt(val, 10);
}

function ensureDir(pathname){
	if( !pathname ){
		return;
	}
	if( !fs.existsSync(pathname) ){
		console.log("creating directory:", pathname);
		mkdirp.sync(pathname);
	}
}

program
	.option("-c, --config <configpath>", "Read configuration", process.env.MYCLINIC_CONFIG)
	.option("-s, --service <service-url>", "Set service server", "http://localhost:9000/service")
	.option("-p, --port <port>", "Set listening port", toInt, 9001)
	.option("--printer-settings <dirname>", "Set printer settings directory", "./printer-settings")
	.parse(process.argv);

var config = Config.read(program.config);
config._web = {
	"service-url": program.service,
	"port": program.port
};
config.printer = {
	"setting-dir": program.printerSetting
};

ensureDir(config.printer["setting-dir"]);

app.run(config);

