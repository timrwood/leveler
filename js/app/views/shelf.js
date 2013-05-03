define(function (require) {
	var Class = require('./actor').extend({
		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				y : -0.2,
				height : 0.4,
				class: "type-color"
			});

			this.jump = this.svg('rect', {
				y : -3.2,
				height : 3,
				class : "hint"
			});

			this.__render();
		},

		render : function () {
			var a = {
				x : -this.model.get('width'),
				width: this.model.get('width') * 2
			};

			this.$el.attr(a);
			this.jump.attr(a);
		}
	});

	require("../mixins/width").call(Class.prototype, {
		min : 0.6,
		snap : 0.2
	});
	require("../mixins/xy").call(Class.prototype, {
		snap : 0.2,
		maxy : -0.2
	});

	return Class;
});
