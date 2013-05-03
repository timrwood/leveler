define(function (require) {
	var Class = require('./actor').extend({
		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				y : 0,
				height : 2,
				class: "type-color"
			});

			this.__render();
		},

		render : function () {
			this.$el.attr({
				x : -this.model.get('width'),
				width: this.model.get('width') * 2
			});
		}
	});

	require("../mixins/width").call(Class.prototype, {
		min : 0.6,
		snap : 0.2
	});
	require("../mixins/xy").call(Class.prototype, {
		snap : 0.2,
		maxy : 0,
		miny : 0
	});

	return Class;
});
