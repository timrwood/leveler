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
			this.resetProperties();
			this.render();
		},

		resetProperties : function () {
			var props = this.model.toJSON(),
				i,
				input, label;
			this.$el.empty();
			for (i in props) {
				if (i === 'type') {
					continue;
				}
				input = $('<input>').attr('name', i);
				label = $('<label>').text(i);
				this.$el.append($('<div>').addClass('attr').append(input).append(label));
			}
		},

		render : function () {
			if (!this.model) {
				return;
			}
			var props = this.model.toJSON(),
				i,
				val;
			for (i in props) {
				this.$el.find('[name="' + i + '"]').val(props[i]);
			}
		}
	});

	return new View();
});
