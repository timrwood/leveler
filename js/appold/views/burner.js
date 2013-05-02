define(function (require, exports, module) {
	return require('./actor').extend({

		initialize : function () {
			this.__init();

			this.$el = this.svg('rect', {
				width: 2,
				height: 0.3,
				"class" : "handle-xy"
			});

			this.top = this.svg('rect', {
				width: 1.8,
				height: 0.1,
				"class" : "handle-xy"
			});
			
			this.moveSnapXY(this.$el);
			this.moveSnapXY(this.top);
		},

		render : function () {
			var x = this.model.get("x"),
				y = this.model.get("y");

			this.$el.attr({
				x : x - 1,
				y : y - 0.1
			});

			this.top.attr({
				x : x - 0.9,
				y : y - 0.2
			});
		}
	});
});