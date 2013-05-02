/*global $:false*/
define(function (require, exports, module) {
	var Backbone = require('Backbone'),
		model = require("../models/actor"),
		singletons = require("../singletons"),
		defaults = require("../defaults");

	return Backbone.Collection.extend({
		model : model,

		initialize : function () {
			
		},

		create : function (data) {
			var i;
			if (singletons[data.type] && this.hasType(data.type)) {
				return;
			}
			data = $.extend({}, defaults[data.type], data);
			Backbone.Collection.prototype.create.call(this, data);
		},

		hasType : function (type) {
			var i;
			for (i = 0; i < this.models.length; i++) {
				if (this.models[i].get('type') === type) {
					return true;
				}
			}
			return false;
		},

		toJSON : function () {
			var op = {};

			this.each(function (model) {
				var type = model.get('type'),
					defs = defaults[type],
					json = model.toJSON(),
					o = {},
					key;

				op[type] = op[type] || [];

				for (key in defs) {
					o[key] = json[key];
				}

				op[type].push(o);
			});

			return op;
		}
	});
});