define(function (require) {
	var Attr = require("./attr");

	function Radius (opts) {
		Attr.apply(this, arguments);
	}

	Radius.prototype = new Attr();

	Radius.prototype.props = ['radius'];

	return Radius;
});
