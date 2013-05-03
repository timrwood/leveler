define(function (require, exports, module) {
	return require('./actor').extend({
		left : null,
		right : null,

		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				y : -10,
				height : 0.4,
				"class" : "handle-xy"
			});
			this.jump = this.svg('line', {
				"class" : "jump-line"
			});
			this.left = this.svg('rect', {
				width: 0.4,
				height : 0.4,
				"class" : "handle handle-x"
			});
			this.right = this.svg('rect', {
				width: 0.4,
				height : 0.4,
				"class" : "handle handle-x"
			});
			
			this.onMove(this.left, this.moveLeft, this);
			this.onMove(this.right, this.moveRight, this);
			this.moveSnapXY(this.$el);
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
				right = this.model.get('right'),
				x = this.model.get('x'),
				y = this.model.get('y') - 0.2;

			this.$el.attr({
				width: right - left,
				x : left + x,
				y : y
			});

			this.left.attr({
				x : left + x,
				y : y
			});

			this.right.attr({
				x : right + x - 0.4,
				y : y
			});

			this.jump.attr({
				x1 : left + x,
				x2 : right + x,
				y1 : y + 3,
				y2 : y + 3
			});
		}
	});
});