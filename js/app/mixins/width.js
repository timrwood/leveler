define(function (require) {
	return function (opts) {
		opts = opts || {};
		opts.min = opts.min || 0;

		this.init_width = function () {
			this.width_handle = this.handle().addClass('handle-x');
			this.onMove(this.width_handle, this.width_move);

			this.width_set(this.model.get('width') || 0);
		};

		this.width_move = function (x, y) {
			this.width_set(this._raw.width + x);
		};

		this.width_set = function (w) {
			this._raw.width = w;
			if (opts.snap !== undefined) {
				w = this.snap(w, opts.snap);
			}
			if (opts.min !== undefined) {
				w = Math.max(opts.min, w);
			}
			if (opts.max !== undefined) {
				w = Math.min(opts.max, w);
			}
			this.model.set({
				width : w
			});
		};

		this.render_width = function () {
			this.width_handle.attr({
				cx : this.model.get('width')
			});
		};
	};
});
