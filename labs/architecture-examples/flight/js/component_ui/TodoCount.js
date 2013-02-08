'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(TodoCount);

        /**
         * The TodoCount is responsible for handling the counter at the footer of the page.
         * @constructor
         */
        function TodoCount() {
            this.after('initialize', function() {
                this.on(document, 'uiTodoListItemDestroyed', this.handleItemDestroyed);
                this.on(document, 'uiTodoListItemCreated', this.incrementCount);
                this.on(document, 'uiTodoListItemCompleted', this.decrementCount);
                this.on(document, 'uiTodoListItemUncompleted', this.incrementCount);
            });

            /**
             * When an item is destroyed, we only want to decrement the count if it was uncompleted before its
             * destruction.
             */
            this.handleItemDestroyed = function(event, data) {
                if(!data.item.completed) {
                    this.decrementCount();
                }
            };

            this.decrementCount = function() {
                var strongEl = this.$node.find('strong');
                strongEl.text(parseInt(strongEl.text()) - 1);
            };

            this.incrementCount = function() {
                var strongEl = this.$node.find('strong');
                strongEl.text(parseInt(strongEl.text()) + 1);
            };
        }
    }
);