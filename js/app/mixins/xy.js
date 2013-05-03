define(function (require) {
	return function () {
		this.init_xy = function () {
			this._raw.x = this.model.get('x') || 0;
			this._raw.y = this.model.get('y') || 0;
			this.onMove(this.g, this.xy_move);
		};

		this.xy_move = function (x, y) {
			this._raw.x += x;
			this._raw.y += y;
			this.model.set({
				x : this._raw.x,
				y : this._raw.y
			});
		};

		this.render_xy = function () {
			this.transform.x = this.model.get('x');
			this.transform.y = this.model.get('y');
			console.log(this._raw.x, this._raw.y);
		};
	};
});
