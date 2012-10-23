define(function (require, exports, module) {
    return require('Backbone').Model.extend({
        initialize : function () {
            console.log('new actor');
        }
    });
});