define(function (require, exports, module) {
	return require('./actor').extend({
		top : null,

		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				y : -10,
				width: 2,
				"class" : "handle-x"
			});
			this.top = this.svg('rect', {
				width: 2,
				height: 0.4,
				"class" : "handle handle-y"
			});
			
			this.moveSnapXY(this.$el);
			this.onMove(this.top, this.moveTop, this);
		},

		moveTop : function (x, y) {
			var top = this.snap('height');
			top -= y;
			top = Math.min(3, Math.max(0.2, top));
			this.snap('height', top);
		},

		render : function () {
			var height = this.model.get('height'),
				x = this.model.get("x");

			this.$el.attr({
				x : x,
				y : -height,
				height : height
			});

			this.top.attr({
				x : x,
				y : -height
			});
		}
	});
});