define(function (require) {
	return function (opts) {
		opts = opts || {};
		opts.min = opts.min || 0;

		this.init_height = function () {
			this.height_handle = this.handle().addClass('handle-y');
			this.onMove(this.height_handle, this.height_move);

			this.height_set(this.model.get('height') || 0);
		};

		this.height_move = function (x, y) {
			this.height_set(this._raw.height + y);
		};

		this.height_set = function (height) {
			this._raw.height = height;
			if (opts.snap !== undefined) {
				height= this.snap(height, opts.snap);
			}
			if (opts.min !== undefined) {
				height = Math.max(opts.min, height);
			}
			if (opts.max !== undefined) {
				height = Math.max(opts.max, height);
			}

			this.model.set({
				height : height
			});
		};

		this.render_height = function () {
			this.height_handle.attr({
				cy : this.model.get('height')
			});
		};
	};
});
