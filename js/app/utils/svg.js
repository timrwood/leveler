define(function (require) {
	return function (tag) {
		return $(document.createElementNS("http://www.w3.org/2000/svg", tag));
	};
});