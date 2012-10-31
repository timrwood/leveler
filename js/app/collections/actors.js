define(function (require, exports, module) {
	var Backbone = require('Backbone'),
		model = require("../models/actor");

	return Backbone.Collection.extend({
		model : model,

		initialize : function () {
			
		}
	});
});