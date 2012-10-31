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
			this.ceiling = this.svg('rect', {
				height : 2,
				y : -12
			});
			this.left = this.svg('rect', {
				width: 2,
				height : 14,
				y : -12,
				"class" : "handle-x"
			});
			this.right = this.svg('rect', {
				width: 2,
				height : 14,
				y : -12,
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

			this.floor.attr({
				width: right - left,
				x : left
			});

			this.ceiling.attr({
				width: right - left,
				x : left
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