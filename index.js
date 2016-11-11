"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var httpProxy = require("http-proxy");

exports.run = function(config){
	var app = express();
	var proxy = httpProxy.createProxyServer({});
	var port = config._web.port;

	var subs = {
		"practice": {
			module: require("myclinic-practice"),
		},
		"shohousen": {
			module: require("myclinic-shohousen"),
		},
		"refer": {
			module: require("myclinic-refer"),
		},
		"pharma": {
			module: require("myclinic-pharma")
		},
		"printer": {
			module: require("myclinic-drawer-print-server"),
		}
	};

	Object.keys(subs).forEach(function(key){
		var sub = subs[key];
		var subapp = express();
		var mod = sub.module;
		var conf = config[key];
		subapp.use(bodyParser.urlencoded({ extended: false }));
		subapp.use(bodyParser.json());
		mod.initApp(subapp, conf);
		if( mod.staticDir ){
			subapp.use(express.static(mod.staticDir));
		}
		console.log(key);
		app.use("/" + key, subapp);
	});

	app.use("/service", function(req, res){
		proxy.web(req, res, { target: config._web["service-url"] }, function(e){
			res.status(500).send({ error: e });
		});
	});

	app.listen(port, function(){
		console.log("practice web server listening to " + port);
	})
};

