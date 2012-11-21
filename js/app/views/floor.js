/*global $:false*/
define(function (require, exports, module) {
	return require('./actor').extend({
		left : null,
		right : null,

		initialize : function () {
			this.__init();

			this.floor = this.svg('rect', {
				height : 2,
				y : 0
			});

			this.$el = this.svg('circle', {
				r : 0.2,
				cy : -0.2,
				"class" : 'hero'
			});

			this.left = this.svg('rect', {
				width: 2,
				height : 2,
				y : 0,
				x : -2,
				"class" : "floor handle-x"
			});
			this.right = this.svg('rect', {
				width: 2,
				height : 2,
				y : 0,
				"class" : "floor handle-x"
			});

			this.onMove(this.right, this.moveRight, this);
		},

		moveRight : function (x, y) {
			var width = this.snap('width');
			width += x;
			width = Math.max(width, 2);
			this.snap('width', width);
		},

		render : function () {
			var width = this.model.get('width');

			this.floor.attr({
				width: width
			});

			this.right.attr({
				x : width
			});
		}
	});
});
