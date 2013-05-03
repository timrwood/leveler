define(function (require, exports, module) {
	var scene = require('../scene'),
		plist = require("../property-list");

	return require('Backbone').View.extend({

		defs : {},

		__init : function () {
			this.g = $.svg('g').appendTo($('svg'));
			this.svg('path', {
				d : "M 0.3 0 L 0 0 L 0 -0.3 L 0 0",
				"stroke-width" : 0.05,
				stroke : "#000"
			});
			this.g.on('mousedown', $.proxy(function() {
				plist.setModel(this.model);
			}, this));

			this._raw = {};
			this.transform = {
				x : 0,
				y : 0,
				angle : 0
			};

			for (var i in this) {
				if (typeof this[i] === "function" && i.indexOf('init_') === 0) {
					this[i]();
				}
			}
			this.model.set(this.defs);
			this.model.on("remove", this.remove, this);
			this.model.on("change", this.__render, this);
		},

		handle : function () {
			var handle = this.svg('circle', {
				r : 0.3,
				"class" : "handle"
			});
			return handle;
		},

		svg : function (tag, attrs) {
			return $.svg(tag).attr(attrs).prependTo(this.g);
		},

		snap : function (val, snap) {
			val = Math.round(val / snap) * snap;
			return parseFloat(val.toPrecision(12));
		},

		clamp : function (val, min, max) {
			return Math.min(max, Math.max(min, val));
		},

		onMove : function (dom, cb, startcb) {
			var self = this;
			dom.on('mousedown', function (e) {
				if (e.altKey || e.ctrlKey || e.metaKey || e.button) {
					return;
				}
				if (typeof startcb === "function") {
					startcb.call(self);
				}
				scene.onMove($.proxy(cb, self));
				plist.setModel(self.model);
				return false;
			});
		},

		__render : function () {
			for (var i in this) {
				if (typeof this[i] === "function" && i.indexOf('render_') === 0) {
					this[i]();
				}
			}
			this.g.attr({
				'transform':
					'translate(' + this.transform.x +  ' ' + this.transform.y + ') ' +
					'rotate(' + this.transform.angle + ')',
				"class": 'is-' + this.model.get('type')
			});
			this.render();
		},

		render : function () {},

		remove : function () {
			this.g.remove();
		}
	});
});
