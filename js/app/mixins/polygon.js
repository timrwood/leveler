define(function (require) {
	return function (opts) {
		this.init_polygon = function () {
			this.polygon_points = [];
			this.polygon_handles = [];

			this.polygon_add(0, 0);
			this.polygon_add(1, 0);
		};

		this.polygon_add = function (x, y) {
			var i = this.polygon_points.length,
				points = [x, y],
				handle = this.handle().addClass('handle-xy');

			this.onMove(handle, $.proxy(function (x, y) {
				points[0] += x;
				points[1] += y;
				this.model.set('p' + i + 'x', points[0]);
				this.model.set('p' + i + 'y', points[1]);
			}, this));

			this.polygon_handles[i] = handle;
			this.polygon_points[i] = points;
		};

		this.render_polygon = function () {
			for (var i = 0; i < this.polygon_handles.length; i++) {
				this.polygon_handles[i].attr({
					cx : this.polygon_points[i][0],
					cy : this.polygon_points[i][1]
				});
			}
		};
	};
});
