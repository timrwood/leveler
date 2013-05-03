require.config({
	paths: {
		"lodash": "libs/lodash",
		"Backbone": "libs/backbone"
	},
	baseUrl: "js",
	waitSeconds: 4,
	urlArgs: "bust=" + Date.now(),
	shim : {
		'Backbone': {
			deps: ['lodash'],
			exports: 'Backbone'
		},
		'lodash': {
			deps: [],
			exports: '_'
		}
	}
});
require(["app/app"], function (app) {
	window.leveler = app;
	app.init();
});
