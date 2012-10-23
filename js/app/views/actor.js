/*global $:false*/
define(function (require, exports, module) {
	var scene = require('./scene');

	return require('Backbone').View.extend({

		initialize : function () {
			this.render();
		},

		svg : function (tag, attrs) {
			return $.svg(tag).attr(attrs).appendTo($('svg'));
		},

		onMove : function (dom, cb, self) {
			dom.on('mousedown', function () {
				scene.onMove($.proxy(cb, self));
			});
		},

		render : function () {}
	});
});