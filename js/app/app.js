define(function (require) {
	var Shelf = require("./entities/Entity")();

	Shelf.addAttribute('width', {
		val : 20,
		min : 0,
		max : 10
	});

	Shelf.addAttribute('xy', {
		valx : 20,
		valy : 20,
		minx : 10,
		snap : 0
	});

	Shelf.addRender('rect', function (rect, attr) {
		rect.attr({
			x : attr.x,
			y : attr.y,
			height : 20,
			width : attr.width,
			fill : "#F00"
		});
	});

	var instanc = new Shelf({
		x : 4,
		y : 2,
		width : 2
	});
});
