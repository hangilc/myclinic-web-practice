"use strict";

var web = require("myclinic-web");

var subs = [
	{
		name: "practice",
		module: require("myclinic-practice"),
		configKey: "practice"
	},
	{
		name: "shohousen",
		module: require("myclinic-shohousen"),
		configKey: "shohousen"
	},
	{
		name: "refer",
		module: require("myclinic-refer"),
		configKey: "refer"
	},
	{
		name: "pharma",
		module: require("myclinic-pharma"),
		configKey: "pharma"
	},
	{
		name: "cashier",
		module: require("myclinic-cashier"),
		configKey: "cashier"
	}
];

web.cmd.runFromCommand(subs, {
	port: 9001,
	usePrinter: true
});
