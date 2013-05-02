define(function (require) {
	var svg = require("../utils/svg");

	function Renderer (type, cb) {
		this.type = type;
		this.render = cb;
	}

	Renderer.prototype = {
		make : function () {
			return svg(this.type);
		}
	};

	return Renderer;
});
