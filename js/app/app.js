define(function (require, exports, module) {
    var _ = require("lodash"),
        data = require("json!../data/1.json"),
        Actor = require("./models/actor"),
        Backbone = require("Backbone");

    return _.extend({
        addActor : function (type, data) {
            console.log(type, JSON.stringify(data));
            var model = new Actor(data);
        },

        init : function () {
            var self = this;

            _.each(data, function (actors, type) {
                if (_.isArray(actors)) {
                    _.each(actors, function (actor) {
                        self.addActor(type, actor);
                    });
                } else {
                    self.addActor(type, actors);
                }
            });
        }
    }, Backbone.Events);
});