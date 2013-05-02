define(function (require) {
	function Attr (opts) {
		this.opts = opts || {};
	}

	Attr.prototype = {
		props : []
	};

	return Attr;
});
