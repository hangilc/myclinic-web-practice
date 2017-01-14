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
	},
	{
		name: "reception",
		module: require("myclinic-reception"),
		configKey: "reception"
	},
	{
		name: "records",
		module: require("myclinic-records"),
		configKey: "records"
	}
];

web.cmd.runFromCommand(subs, {
	port: 9001,
	usePrinter: true
});
