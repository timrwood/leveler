define(function (require, exports, module) {
	var scene = require('../scene');

	return require('Backbone').View.extend({

		__init : function () {
			this.g = $.svg('g').appendTo($('svg'));
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
			return Math.round(val / snap) * snap;
		},

		clamp : function (val, min, max) {
			return Math.min(max, Math.max(min, val));
		},

		onMove : function (dom, cb) {
			var self = this;
			dom.on('mousedown', function (e) {
				if (e.altKey || e.ctrlKey || e.metaKey || e.button) {
					return;
				}
				scene.onMove($.proxy(cb, self));
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
