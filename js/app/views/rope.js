define(function (require) {
	var Class = require('./actor').extend({
		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				x : -0.1,
				width: 0.2,
				class: "type-color"
			});

			this.__render();
		},

		render : function () {
			this.$el.attr({
				height : this.model.get('height')
			});
		}
	});

	require("../mixins/height").call(Class.prototype, {
		snap : 0.2
	});
	require("../mixins/xy").call(Class.prototype, {
		snap : 0.2
	});

	return Class;
});
