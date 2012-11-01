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
			$.extend(data, defaults[data.type]);
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
		}
	});
});