define(function (require, exports, module) {
	return require('./actor').extend({

		initialize : function () {
			this.$el = this.svg('circle', {
				r : 0.25,
				"class" : 'hero'
			});

			this.render();
		},

		render : function () {
			this.$el.attr({
				cx : this.model.get("x"),
				cy : this.model.get("y")
			});
		}
	});
});