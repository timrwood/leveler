define(function (require, exports, module) {
	return require('./actor').extend({

		initialize : function () {
			this.$el = this.svg('circle', {
				r : 0.4,
				"class" : 'hero handle-xy'
			});

			this.model.on('change', this.render, this);

			this.moveSnapXY(this.$el);

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