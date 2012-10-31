define(function (require, exports, module) {
	return require('./actor').extend({

		initialize : function () {
			this.__init();

			this.$el = this.svg('circle', {
				r : 0.4,
				"class" : 'hero handle-xy'
			});

			this.moveSnapXY(this.$el);
		},

		render : function () {
			this.$el.attr({
				cx : this.model.get("x"),
				cy : this.model.get("y")
			});
		}
	});
});