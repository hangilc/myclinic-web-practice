"use strict";

var app = require("./index");
var Config = require("myclinic-config");
var path = require("path");
var program = require("commander");
var fs = require("fs");
var mkdirp = require("mkdirp");
var conti = require("conti");
var http = require("http");
var url = require("url");

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

function fetchConfig(progServiceUrl, subs, cb){
	var config = {};
	var serviceUrl = url.parse(progServiceUrl);
	conti.forEachPara(subs, function(sub, done){
		console.log("fetching config for", sub);
		var req = http.request({
			protocol: serviceUrl.protocol,
			hostname: serviceUrl.hostname,
			port: serviceUrl.port,
			path: "/config/" + sub
		}, function(res){
			res.setEncoding("utf8");
			var data = "";
			res.on("data", function(chunk){
				data += chunk;
			});
			res.on("end", function(){
				config[sub] = JSON.parse(data);
				console.log("fetched config for", sub);
				done();
			});
			res.on("error", function(err){
				done(err);
			});
		});
		req.on("error", function(err){
			done(err);
		});
		req.end();
	}, function(err){
		if( err ){
			cb(err);
			return;
		}
		cb(undefined, config);
	});
}

function tryAutoConfig(){
	var subs = ["practice", "shohousen", "refer", "pharma"];
	fetchConfig(program.service, subs, function(err, config){
		if( err ){
			if( err.code === "ECONNREFUSED" ){
				console.log("server not responding, trying later...");
				setTimeout(function(){
					tryAutoConfig();
				}, 10000);
			} else {
				console.log("ERROR: " + err);
			}
			return;
		}
		run(config);
	});
}

function run(config){
	config._web = {
		"service-url": program.service + "/service",
		"port": program.port
	};
	config.printer = {
		"setting-dir": program.printerSetting
	};
	ensureDir(config.printer["setting-dir"]);
	app.run(config);
}

program
	.option("-c, --config <configpath>", "Read configuration", "auto")
	.option("-s, --service <service-url>", "Set service server", "http://localhost:9000")
	.option("-p, --port <port>", "Set listening port", toInt, 9001)
	.option("--printer-settings <dirname>", "Set printer settings directory", "./printer-settings")
	.parse(process.argv);

if( program.config === "auto" ){
	tryAutoConfig();
} else {
	run(Config.read(program.config));
}




