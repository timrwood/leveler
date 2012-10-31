/*global $:false*/
define(function (require, exports, module) {
	var _ = require("lodash"),
		Actor = require("./models/actor"),
		Actors = require("./collections/actors"),
		Backbone = require("Backbone"),
		files = require("./files");

	// todo: move this
	$.svg = function (tag) {
		return $(document.createElementNS("http://www.w3.org/2000/svg", tag));
	};

	return _.extend({
		actors : null,

		init : function () {
			var self = this;

			this.actors = new Actors();
			this.actors.on("add", this.addOne, this);
			this.actors.on("reset", this.addAll, this);

			files.on("add", this.add, this);
		},

		add : function (data) {
			var actorCollection = this.actors;

			this.removeAll();

			_.each(data, function (actors, type) {
				if (_.isArray(actors)) {
					_.each(actors, function (actor) {
						actor.type = type;
						actorCollection.create(actor);
					});
				} else {
					actors.type = type;
					actorCollection.create(actors);
				}
			});
		},

		addOne : function (actor) {
			var type = actor.get("type");
			require(["./views/" + type], function (View) {
				var view = new View({
					model : actor
				});
				view.render();
			});
		},

		removeAll : function () {
			while (this.actors && this.actors.models && this.actors.models.length) {
				this.actors.pop();
			}
		},

		addAll : function () {
			this.actors.each(this.addOne);
		}
	}, Backbone.Events);
});