define(function (require) {
	var Attr = require("./attr");

	function XY (opts) {
		Attr.apply(this, arguments);
	}

	XY.prototype = new Attr();

	XY.prototype.props = ['x', 'y'];

	return XY;
});
