define(function (require, exports, module) {
	var scene = {
		init : function () {
			$(window).on('mousedown', $.proxy(this.__moveStart, this));
			$(window).on('mousemove', $.proxy(this.__move, this));
			$(window).on('mouseup', $.proxy(this.__moveEnd, this));
		},

		__lx : 0,
		__ly : 0,

		__moveCb : null,

		__moveStart : function (e) {
			this.__lx = e.clientX;
			this.__ly = e.clientY;
		},

		__moveEnd : function (e) {
			this.__moveCb = null;
		},

		onMove : function (cb) {
			this.__moveCb = cb;
		},

		__move : function (e) {
			var x = e.clientX,
				y = e.clientY,
				dx = this.__lx - e.clientX,
				dy = this.__ly - e.clientY;

			if (this.__moveCb && typeof this.__moveCb == "function") {
				this.__moveCb(-dx, -dy);
			}

			this.__lx = x;
			this.__ly = y;
		}
	};

	scene.init();

	return scene;
});