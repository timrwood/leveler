define(function (require) {
	var attrs = {
			xy : require("../attributes/xy"),
			radius : require("../attributes/radius"),
			width : require("../attributes/width")
		},
		svg = require("../utils/svg"),
		Renderer = require("../attributes/renderer"),
		Model = require("Backbone").Model;

	return function () {
		function Entity (opts) {
			this.g = svg('g').appendTo('svg');
			this.model = new Model();
			this.model.set(opts);
			this.make();
			this.render();
			console.log(this.props());
		}

		Entity.prototype = {
			__attrs : [],
			__renderers : [],

			make : function () {
				var i, o,
					Attr, options;

				this.renderers = this.renderers || [];

				for (i = 0; i < this.__renderers.length; i++) {
					if (!this.renderers[i]) {
						this.renderers[i] = this.__renderers[i].make();
						this.g.append(this.renderers[i]);
					}
				}

				this.attrs = this.attrs || [];

				for (i = 0; i < this.__attrs.length; i++) {
					if (!this.attrs[i]) {
						Attr = this.__attrs[i][0];
						options = this.__attrs[i][1];
						this.attrs[i] = new Attr(options);
					}
				}
			},

			props : function () {
				var i, j, p,
					attr,
					o = {};
				for (i = 0; i < this.attrs.length; i++) {
					attr = this.attrs[i];
					for (j = 0; j < attr.props.length; j++) {
						p = attr.props[j];
						o[p] = this.model.get(p);
						// o[p] = 1;
					}
				}
				return o;
			},

			render : function () {
				var i,
					props = this.props();

				this.g.attr('transform', 'translate(' + (props.x || 0) + ', ' + (props.y || 0) + ') rotate(' + (props.angle || 0) + ')');

				for (i = 0; i < this.__renderers.length; i++) {
					this.__renderers[i].render(this.renderers[i], props);
				}
			}
		};

		Entity.addAttribute = function (name, options) {
			var Attr = attrs[name];

			if (!Attr) {
				console.error("no " + name + " attribute");
				return;
			}

			Entity.prototype.__attrs.push([Attr, options]);
		};

		Entity.addRender = function (type, cb) {
			Entity.prototype.__renderers.push(new Renderer(type, cb));
		};

		return Entity;
	};
});
