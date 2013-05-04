define(function () {
	var View = require('Backbone').View.extend({
		events: {
			"input input": "onChange"
		},

		initialize : function () {
			this.setElement($('#block-item-properties'));
		},

		onChange : function (e) {
			var dom = $(e.currentTarget),
				name = dom.attr('name'),
				val = dom.val();
			if (!isNaN(val)) {
				this.model.set(name, +val);
			}
		},

		setModel : function (model) {
			if (this.model === model) {
				return;
			}
			if (this.model) {
				this.stopListening(this.model);
			}
			this.model = model;
			this.listenTo(model, 'change', $.proxy(this.render, this));
			this.$el.empty();
			this.render();
		},

		render : function () {
			var props = this.model.toJSON(),
				input, label,
				i;

			console.log(props);
			for (i in props) {
				if (i === "type") {
					continue;
				}
				console.log(i);
				input = this.$el.find('[name="' + i + '"]');
				if (!input.length) {
					input = $('<input>').attr('name', i);
					label = $('<label>').text(i);
					this.$el.append($('<div>').addClass('attr').append(input).append(label));
				}
				input.val(props[i]);
			}
		}
	});

	return new View();
});
