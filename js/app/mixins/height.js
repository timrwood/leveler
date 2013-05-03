define(function (require) {
	return function (opts) {
		opts = opts || {};
		opts.min = opts.min || 0;

		this.init_height = function () {
			this.height_handle = this.handle().addClass('handle-y');
			this.onMove(this.height_handle, this.height_move);

			this.model.normalize_height = $.proxy(this.height_normalize, this);
			this.model.set('height', this.model.get('height') || 0);
		};

		this.height_move = function (x, y) {
			this.model.set('height', this._raw.height + x);
		};

		this.height_normalize = function (val) {
			this._raw.height = val;

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

		this.render_height = function () {
			this.height_handle.attr({
				cy : this.model.get('height')
			});
		};
	};
});
