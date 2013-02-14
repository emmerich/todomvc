'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(TodoRouter);

        function TodoRouter() {

            this.after('initialize', function() {
                var showActiveItems = function() {
                    this.trigger('showActiveItems');
                };

                var showCompletedItems = function() {
                    this.trigger('showCompletedItems')
                };

                var showAll = function() {
                    this.trigger('showAllItems');
                };

                var routes = {
                    '/': showAll.bind(this),
                    '/active': showActiveItems.bind(this),
                    '/completed': showCompletedItems.bind(this)
                };

                var router = new Router(routes).init();
            });
        }
    }
);