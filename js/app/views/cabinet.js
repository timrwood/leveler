define(function (require, exports, module) {
	return require('./actor').extend({
		initialize : function () {
			this.$el = this.svg('rect', {
				height : 20,
			});
			this.left = this.svg('rect', {
				height : 20,
				width: 0.2,
				"class" : "handle"
			});
			this.render();
		},

		render : function () {
			var left = this.model.get('left'),
				right = this.model.get('right'),
				top = this.model.get('top');

			this.$el.attr({
				width: right - left,
				x : left,
				y : -20 + top
			});

			this.left.attr({
				x : left,
				y : -20 + top
			});
		}
	});
});