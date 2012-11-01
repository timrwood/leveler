/*global $:false*/
define(function (require, exports, module) {
	var _ = require("lodash"),
		Backbone = require("Backbone"),
		reader = new FileReader(),
		scene;

	function noop(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	scene = _.extend({
		init : function () {
			$(document).on("dragenter", this.dragenter);
			$(document).on("dragexit", this.dragexit);
			$(document).on("dragover", this.dragover);
			$(document).on("drop", this.drop);
		},

		dragenter : function (e) {
			noop(e);
		},

		dragexit : function (e) {
			noop(e);
		},

		dragover : function (e) {
			noop(e);
		},

		drop : function (e) {
			noop(e);

			var files = e.originalEvent.dataTransfer.files;

			// Only call the handler if 1 or more files was dropped.
			if (files.length > 0) {
				reader.readAsText(files[0]);
			}
		},

		save : function (json) {
			console.log(JSON.stringify(json, null, 4));
		},

		onFileLoaded : function (e) {
			var obj = JSON.parse(e.target.result);
			this.trigger("add", obj);
		}
	}, Backbone.Events);

	reader.onload = $.proxy(scene.onFileLoaded, scene);

	scene.init();

	return scene;
});