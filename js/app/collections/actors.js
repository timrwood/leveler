define(function (require, exports, module) {
	var Backbone = require('Backbone'),
		model,
		singletons = require("../singletons");

	model = Backbone.Model.extend({
		save : function () {},
		_set : function (key, val) {
			var set = 'normalize_' + key;
			if (typeof this[set] === 'function') {
				val = this[set](val);
			}
			Backbone.Model.prototype.set.call(this, key, val);
		},
		set : function (key, val) {
			if (typeof key === 'object') {
				for (var i in key) {
					this._set(i, key[i]);
				}
			} else {
				this._set(key, val);
			}
		}
	});

	return Backbone.Collection.extend({
		model : model,

		initialize : function () {

		},

		create : function (data) {
			var i;
			if (singletons[data.type] && this.hasType(data.type)) {
				return;
			}
			Backbone.Collection.prototype.create.call(this, data);
		},

		hasType : function (type) {
			var i;
			for (i = 0; i < this.models.length; i++) {
				if (this.models[i].get('type') === type) {
					return true;
				}
			}
			return false;
		},

		toJSON : function () {
			var op = {};

			this.each(function (model) {
				var type = model.get('type'),
					json = model.toJSON(),
					o = {},
					key;

				op[type] = op[type] || [];
				op[type].push(o);
			});

			return op;
		}
	});
});
