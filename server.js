"use strict";

var app = require("./index");
var Config = require("myclinic-config");
var path = require("path");

var config = {
	port: 9001,
	"service-url": "http://localhost:9000/service"
};

Config.extend(config, Config.read(path.join(process.env.MYCLINIC_CONFIG, "practice")));

app.run(config);

