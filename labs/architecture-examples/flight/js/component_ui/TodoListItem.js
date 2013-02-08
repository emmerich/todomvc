'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(TodoListItem);

        /**
         * The TodoListItem is an individual item in the application. It is responsible for toggling its own
         * completed and destroying itself.
         * @constructor
         */
        function TodoListItem() {

            /**
             * Boolean representing whether the todo item has been completed or not.
             * @type {Boolean}
             */
            this.completed = false;

            this.defaultAttrs({
                destroySelector: '.destroy',
                toggleSelector: '.toggle'
            });

            this.after('initialize', function() {
                this.on('click', {
                    'destroySelector': this.destroy,
                    'toggleSelector': this.toggle
                });

                // Respond to toggling all items and deletion of all completed items.
                this.on(document, 'dataToggleAll', this.toggle);
                this.on(document, 'dataClearCompletedItems', this.destroyIfCompleted);
            });

            /**
             * Destroys the item, letting the application know it has been destroyed and removing itself from the
             * DOM.
             */
            this.destroy = function() {
                this.trigger('uiTodoListItemDestroyed', { item: this });
                this.$node.remove();
            };

            /**
             * Destroys the todo item if it is completed
             */
            this.destroyIfCompleted = function() {
                if(this.completed) {
                    this.destroy();
                }
            };

            /**
             * Toggles the completion of this todo item. Optionally supplied a toggle value through the data object,
             * which will force that value to be the new completed value. If no value is specified, then the item
             * toggles itself to the opposite of its current completed status.
             */
            this.toggle = function(event, data) {
                var toggle;

                if(typeof data.toggle === 'boolean') {
                    // If we are supplied a toggle value, toggle to that
                    toggle = data.toggle;
                } else if(typeof data.toggle === 'undefined') {
                    toggle = !this.completed;
                }

                if(this.completed !== toggle) {
                    // Update our internal completed value
                    this.completed = toggle;

                    // Set the checkbox
                    this.$node.find(this.attr.toggleSelector).attr('checked', toggle);

                    // Update the classes and trigger the appropriate event
                    if(toggle) {
                        this.$node.addClass('completed');
                        this.trigger('uiTodoListItemCompleted', { item : this });
                    } else {
                        this.$node.removeClass('completed');
                        this.trigger('uiTodoListItemUncompleted', { item: this });
                    }
                }
            };
        }
});