/*global $:false*/
define(function (require, exports, module) {
	return require('./actor').extend({
		left : null,
		right : null,

		initialize : function () {
			this.$el = this.svg('rect', {
				height : 2,
				y : 0
			});
			this.left = this.svg('rect', {
				width: 2,
				height : 22,
				y : -20,
				"class" : "handle-x"
			});
			this.right = this.svg('rect', {
				width: 2,
				height : 22,
				y : -20,
				"class" : "handle-x"
			});
			this.onMove(this.left, this.moveLeft, this);
			this.onMove(this.right, this.moveRight, this);
			this.model.on('change', this.render, this);
			this.render();
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
				x : left,
				height : 2,
				y : 0
			});

			this.left.attr({
				x : left - 2
			});
			
			this.right.attr({
				x : right
			});
		}
	});
});