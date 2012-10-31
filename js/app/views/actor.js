/*global $:false*/
define(function (require, exports, module) {
	var scene = require('./scene');

	return require('Backbone').View.extend({

		_svgs : null,

		__init : function () {
			this.model.on("remove", this.remove, this);
			this.model.on("change", this.render, this);

			this._svgs = [];
		},

		svg : function (tag, attrs) {
			var svg = $.svg(tag).attr(attrs).appendTo($('svg'));

			this._svgs.push(svg);

			return svg;
		},

		snap : function (prop, val) {
			if (val == null) {
				return this.model.get("__" + prop) || this.model.get(prop);
			}
			this.model.set("__" + prop, val);
			val = Math.round(val * 5) / 5;
			this.model.set(prop, val);
		},

		moveSnapXY : function (dom) {
			this.onMove(dom, this.__moveSnapXY, this);
		},

		__moveSnapXY : function (x, y) {
			this.snap("x", this.snap('x') + x);
			this.snap("y", this.snap('y') + y);
		},

		moveXY : function (dom) {
			this.onMove(dom, this.__moveXY, this);
		},

		__moveXY : function (x, y) {
			this.model.set({
				x: this.model.get('x') + x,
				y: this.model.get('y') + y,
			});
		},

		onMove : function (dom, cb, self) {
			dom.on('mousedown', function () {
				scene.onMove($.proxy(cb, self));
			});
		},

		render : function () {},

		remove : function () {
			while (this._svgs && this._svgs.length) {
				this._svgs.pop().remove();
			}
		}
	});
});