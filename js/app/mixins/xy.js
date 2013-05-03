define(function (require) {
	return function (opts) {
		opts = opts || {};

		this.init_xy = function () {
			this.model.normalize_x = $.proxy(this.xy_normalize_x, this);
			this.model.normalize_y = $.proxy(this.xy_normalize_y, this);
			this.model.set('x', this.model.get('x') || 0);
			this.model.set('y', this.model.get('y') || 0);
			this.onMove(this.g, this.xy_move, this.xy_start);
		};

		this.xy_start = function (x, y) {
			this._raw.x = this.model.get('x');
			this._raw.y = this.model.get('y');
		};

		this.xy_move = function (x, y) {
			this.model.set('x', this._raw.x + x);
			this.model.set('y', this._raw.y + y);
		};

		this.xy_normalize_x = function (x) {
			var snap = opts.snap || opts.snapx,
				min = opts.minx,
				max = opts.maxx;

			this._raw.x = x;

			if (snap !== undefined) {
				x = this.snap(x, snap);
			}
			if (min !== undefined) {
				x = Math.max(min, x);
			}
			if (max !== undefined) {
				x = Math.min(max, x);
			}
			return x;
		};

		this.xy_normalize_y = function (y) {
			var snap = opts.snap || opts.snapy,
				min = opts.miny,
				max = opts.maxy;

			this._raw.y = y;

			if (snap !== undefined) {
				y = this.snap(y, snap);
			}
			if (min !== undefined) {
				y = Math.max(min, y);
			}
			if (max !== undefined) {
				y = Math.min(max, y);
			}
			return y;
		};

		this.render_xy = function () {
			this.transform.x = this.model.get('x');
			this.transform.y = this.model.get('y');
		};
	};
});
