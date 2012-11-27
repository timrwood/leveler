define(function (require, exports, module) {
	return require('./actor').extend({

		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				y : -5,
				width: 0.2,
				"class" : "handle-xy"
			});

			this.bottom = this.svg('circle', {
				r: 0.4,
				"class" : "circle-border handle handle-y"
			});
			
			this.moveSnapXY(this.$el);

			this.onMove(this.bottom, this.moveBottom, this);
		},

		moveBottom : function (x, y) {
			var top = this.snap('height');
			top += y;
			this.snap('height', top);

		},

		render : function () {
			var height = this.model.get('height'),
				x = this.model.get("x"),
				y = this.model.get("y");

			this.$el.attr({
				x : x - 0.1,
				y : y,
				height : height
			});

			this.bottom.attr({
				cx : x,
				cy : y + height
			});
		}
	});
});