define(function (require) {
	var Class = require('./actor').extend({
		initialize : function () {
			this.__init();

			this.floor = this.svg('rect', {
				height : 10,
				"class" : 'type-color'
			});

			this.svg('circle', {
				r : 0.2,
				cy : -0.2,
				"class" : 'hero'
			});

			this.__render();
		},

		render : function () {
			var width = this.model.get('width');

			this.floor.attr({
				width: width
			});
		}
	});

	require("../mixins/width").call(Class.prototype, {
		snap : 1
	});

	return Class;
});
