require.config({
	paths: {
		"underscore": "libs/lodash",
		"lodash": "libs/lodash",
		"Backbone": "libs/backbone",
		"bonsai": "libs/bonsai",
		"text" : "libs/amd/text",
		"json" : "libs/amd/json",
		"hbs" : "libs/amd/hbs",
		"Handlebars" : "libs/handlebars"
	},
	baseUrl: "js",
	waitSeconds: 4,
	shim : {
		'underscore': {
			deps: [],
			exports: '_'
		},
		'Backbone': {
			deps: ['lodash'],
			exports: 'Backbone'
		},
		'lodash': {
			deps: [],
			exports: '_'
		}
	},
	hbs: {
		disableI18n: true,
		disableHelpers: true,
		templateExtension: "html"
	}
});
require(["app/app"], function (app) {
	window.leveler = app;
	app.init();
});