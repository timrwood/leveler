/*global $:false*/
define(function (require, exports, module) {
	var _ = require("lodash"),
		Actors = require("./collections/actors"),
		Backbone = require("Backbone"),
		files = require("./files"),
		singletons = require("./singletons"),
		types = require("./types");

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

			this.initTypes();

			$(document).on("click", "[data-type]", $.proxy(this.addType, this));
			$(document).on("click", ".reset", $.proxy(this.reset, this));
			$(document).on("click", ".save", $.proxy(this.save, this));
			$(document).on("click", "[data-action]", $.proxy(this.onAction, this));

			this.reset();
		},

		initTypes : function () {
			var wrap = $('#block-add-items'), i;
			for (i = 0; i < types.length; i++) {
				wrap.append($('<button>').attr('data-type', types[i]).text(types[i]).addClass('type is-' + types[i]));
			}
		},

		onAction : function (e) {
			var action = $(e.currentTarget).data('action');

			if (typeof this[action] === "function") {
				this[action]();
			}
		},

		sidebar : function () {
			$('body').toggleClass('show-sidebar');
		},

		addType : function (e) {
			this.actors.create({
				type : $(e.currentTarget).data('type')
			});
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
			console.log(type);
			require(["./views/" + type], function (View) {
				var view = new View({
					model : actor
				});
				view.render();
			});
		},

		reset : function () {
			this.removeAll();

			$.each(singletons, $.proxy(function (i) {
				this.actors.create({
					type : i
				});
			}, this));
		},

		save : function () {
			files.save(this.actors.toJSON());
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
