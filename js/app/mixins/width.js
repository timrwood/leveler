define(function (require) {
	return function (opts) {
		opts = opts || {};
		opts.min = opts.min || 0;

		this.init_width = function () {
			this.width_handle = this.handle().addClass('handle-x');
			this.onMove(this.width_handle, this.width_move, this.width_start);

			this.model.normalize_width = $.proxy(this.width_normalize, this);
			this.model.set('width', this.model.get('width') || 0);
		};

		this.width_start = function (x, y) {
			this._raw.width = this.model.get('width');
		};

		this.width_move = function (x, y) {
			this.model.set('width', this._raw.width + x);
		};

		this.width_normalize = function (val) {
			this._raw.width = val;

			if (opts.snap !== undefined) {
				val = this.snap(val, opts.snap);
			}
			if (opts.min !== undefined) {
				val = Math.max(opts.min, val);
			}
			if (opts.max !== undefined) {
				val = Math.min(opts.max, val);
			}
			return val;
		};

		this.render_width = function () {
			this.width_handle.attr({
				cx : this.model.get('width')
			});
		};
	};
});
