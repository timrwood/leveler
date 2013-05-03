define(function (require, exports, module) {
	var Class = require('./actor').extend({
		initialize : function () {
			this.__init();

			this.svg('rect', {
				width: 2,
				height: 0.3,
				y : -0.3,
				x : -1,
				class : "type-color"
			});

			this.svg('rect', {
				width: 1.8,
				height: 0.1,
				y : -0.4,
				x : -0.9,
				class : "type-color"
			});

			this.__render();
		}
	});

	require("../mixins/xy").call(Class.prototype, {
		snap : 0.2
	});

	return Class;
});
