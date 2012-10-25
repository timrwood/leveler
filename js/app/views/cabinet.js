define(function (require, exports, module) {
	return require('./actor').extend({
		left : null,
		right : null,

		initialize : function () {
			this.$el = this.svg('rect', {
				y : -10,
				"class" : "handle-x"
			});
			this.left = this.svg('rect', {
				width: 0.4,
				y : -10,
				"class" : "handle handle-x"
			});
			this.right = this.svg('rect', {
				width: 0.4,
				y : -10,
				"class" : "handle handle-x"
			});
			this.bottom = this.svg('rect', {
				height : 0.4,
				"class" : "handle handle-y"
			});
			this.model.on('change', this.render, this);
			this.onMove(this.left, this.moveLeft, this);
			this.onMove(this.right, this.moveRight, this);
			this.onMove(this.bottom, this.moveBottom, this);
			this.onMove(this.$el, this.moveBoth, this);
			this.render();
		},

		moveBoth : function (x, y) {
			this.moveLeft(x, y);
			this.moveRight(x, y);
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

		moveBottom : function (x, y) {
			var top = this.snap('top');
			top += y;
			top = Math.min(-2, Math.max(-8, top));
			this.snap('top', top);
		},

		render : function () {
			var left = this.model.get('left'),
				right = this.model.get('right'),
				top = this.model.get('top');

			this.$el.attr({
				width: right - left,
				x : left,
				height : 10 + top
			});

			this.left.attr({
				x : left,
				height : 10 + top
			});

			this.right.attr({
				x : right - 0.4,
				height : 10 + top
			});

			this.bottom.attr({
				width: right - left,
				x : left,
				y : top - 0.4
			});
		}
	});
});