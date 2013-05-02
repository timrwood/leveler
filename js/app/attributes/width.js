define(function (require) {
	var Attr = require("./attr");

	function Width (opts) {
		Attr.apply(this, arguments);
	}

	Width.prototype = new Attr();

	Width.prototype.props = ['width'];

	return Width;
});
