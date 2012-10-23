define(function (require, exports, module) {
	var _ = require("lodash"),
		data = require("json!../data/1.json"),
		Actor = require("./models/actor"),
		Backbone = require("Backbone");

	// todo: move this
	$.svg = function (tag) {
		return $(document.createElementNS("http://www.w3.org/2000/svg", tag));
	};

	return _.extend({
		addActor : function (type, data) {
			var model = new Actor(data);
			require(["./views/" + type], function (View) {
				var view = new View({
					model : model
				});
			});
		},

		init : function () {
			var self = this;

			_.each(data, function (actors, type) {
				if (_.isArray(actors)) {
					_.each(actors, function (actor) {
						self.addActor(type, actor);
					});
				} else {
					self.addActor(type, actors);
				}
			});
		}
	}, Backbone.Events);
});