/*global $:false*/
define(function (require, exports, module) {
	var scene = {
		init : function () {
			$(window).on('mousedown', $.proxy(this.__moveStart, this));
			$(window).on('mousemove', $.proxy(this.__move, this));
			$(window).on('mouseup', $.proxy(this.__moveEnd, this));
			$(window).on('resize', $.proxy(this.__resize, this));
			this.__resize();
		},

		__lx : 0,
		__ly : 0,

		__dx : 0,
		__dy : 0,

		__moveCb : null,

		__isMovingCamera : false,

		__moveStart : function (e) {
			this.__lx = e.clientX;
			this.__ly = e.clientY;

			this.__isMovingCamera = true;
		},

		__moveEnd : function (e) {
			this.__moveCb = null;

			this.__isMovingCamera = false;
		},

		onMove : function (cb) {
			this.__moveCb = cb;
		},

		__move : function (e) {
			var x = e.clientX,
				y = e.clientY,
				dx = this.__lx - e.clientX,
				dy = this.__ly - e.clientY;

			this.__dx += dx;
			this.__dy += dy;

			if (this.__moveCb && typeof this.__moveCb === "function") {
				this.__moveCb(-dx * this.ratio, -dy * this.ratio);
			} else if (this.__isMovingCamera) {
				this.__moveCamera(dx * this.ratio, dy * this.ratio);
			}

			this.__lx = x;
			this.__ly = y;
		},

		__moveCamera : function (x, y) {
			var box = $('svg')[0].viewBox.baseVal;

			box.x += x;
			box.y += y;
		},

		ratio : 1,

		__resize : require('lodash').throttle(function () {
			var box = $('svg')[0].viewBox.baseVal,
				boxWidth = box.width,
				boxHeight = box.height,
				boxRatio = boxWidth / boxHeight,
				actualWidth = $('svg').width(),
				actualHeight = $('svg').height(),
				actualRatio = actualWidth / actualHeight;

			if (boxRatio > actualRatio) {
				this.ratio = boxWidth / actualWidth;
				//console.log('boxWidth / actualWidth', boxWidth, "/", actualWidth);
			} else {
				this.ratio = boxHeight / actualHeight;
				//console.log('boxHeight / actualHeight', boxHeight, "/", actualHeight);
			}

			//console.log('ratio', this.ratio);

		}, 100)
	};

	scene.init();

	return scene;
});