'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(TodoList);

        function TodoList() {

            this.toggleAllStatus = false;

            this.toggleAll = function() {
                this.toggleAllStatus = !this.toggleAllStatus;

                this.trigger('toggleAll', {
                    toggle: this.toggleAllStatus
                });
            };

            this.after('initialize', function() {
                this.on('toggleAllRequest', this.toggleAll);
            });
        }
});