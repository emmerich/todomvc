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
                this.on(document, 'todoListItemDestroyed', this.handleItemDestroyed);
                this.on(document, 'todoListItemCreated', this.incrementCount);
                this.on(document, 'todoListItemCompleted', this.decrementCount);
                this.on(document, 'todoListItemUncompleted', this.incrementCount);
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
                this.modifyCount(function(val) { return val - 1; });
            };

            this.incrementCount = function() {
                this.modifyCount(function(val) { return val + 1; });
            };

            this.modifyCount = function(modifier) {
                var strongEl = this.$node.find('strong'),
                    val = modifier(parseInt(strongEl.text()));

                this.$node.html('<strong>' + val + '</strong> ' + this.getPlural(val) + ' left');
            };

            this.getPlural = function(val) {
                return val === 1 ? 'item' : 'items';
            }
        }
    }
);