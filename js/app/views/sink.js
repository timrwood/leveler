/*global $:false*/
define(function (require, exports, module) {
	return require('./actor').extend({
		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				width: 2,
				height : 0.2,
				y : 1.8,
				x : -2
			});
			this.left = this.svg('rect', {
				width: 0.2,
				height : 2,
				y : 0,
				x : -2,
				"class" : "handle-x"
			});
			this.right = this.svg('rect', {
				width: 0.2,
				height : 2,
				y : 0,
				"class" : "handle-x"
			});

			this.onMove(this.left, this.moveLeft, this);
			this.onMove(this.right, this.moveRight, this);
		},

		moveLeft : function (x, y) {
			var left = this.snap('left'),
				right = this.snap('right');
			left += x;
			left = Math.min(left, right);
			this.snap('left', left);
		},

		moveRight : function (x, y) {
			var left = this.snap('left'),
				right = this.snap('right');
			right += x;
			right = Math.max(left, right);
			this.snap('right', right);
		},

		render : function () {
			var left = this.model.get('left'),
				right = this.model.get('right');

			this.$el.attr({
				width: right - left,
				x : left
			});

			this.left.attr({
				x : left
			});

			this.right.attr({
				x : right - 0.2
			});
		}
	});
});
