'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(TodoList);

        function TodoList() {

            this.toggleAllStatus = false;
            this.todoListItemCount = 0;

            this.toggleAll = function() {
                this.toggleAllStatus = !this.toggleAllStatus;

                this.trigger('toggleAll', {
                    toggle: this.toggleAllStatus
                });
            };

            this.incrementItemCount = function() {
                this.todoListItemCount++;

                if(this.todoListItemCount > 0) {
                    this.trigger('todoListPopulated');
                }
            };

            this.decrementItemCount = function() {
                this.todoListItemCount--;

                if(this.todoListItemCount <= 0) {
                    this.trigger('todoListEmptied');
                }
            };

            this.after('initialize', function() {
                this.on('toggleAllRequest', this.toggleAll);

                this.on(document, 'todoListItemDestroyed', this.decrementItemCount);
                this.on(document, 'todoListItemCreated', this.incrementItemCount);
            });
        }
});