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
                this.on(document, 'toggleAll', this.toggle);
                this.on(document, 'clearCompletedItems', this.destroyIfCompleted);

                this.on(document, 'showCompletedItems', this.showIfCompleted);
                this.on(document, 'showActiveItems', this.showIfActive);
                this.on(document, 'showAllItems', this.show);

                this.toggle(null, { toggle: this.attr.completed });
            });

            /**
             * Destroys the item, letting the application know it has been destroyed and removing itself from the
             * DOM.
             */
            this.destroy = function() {
                this.trigger('todoListItemDestroyed', { item: this });
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

            this.showIfCompleted = function() {
                if(this.completed) {
                    this.show();
                } else {
                    this.hide();
                }
            };

            this.showIfActive = function() {
                if(this.completed) {
                    this.hide();
                } else {
                    this.show();
                }
            };

            this.show = function() {
                this.$node.removeClass('hidden');
            };

            this.hide = function() {
                this.$node.addClass('hidden');
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

                    this.trigger('todoListItemChanged', {
                        id : this.attr.id,
                        completed: this.completed
                    });

                    // Set the checkbox
                    this.$node.find(this.attr.toggleSelector).attr('checked', toggle);

                    // Update the classes and trigger the appropriate event
                    if(toggle) {
                        this.$node.addClass('completed');
                        this.trigger('todoListItemCompleted', { item : this });
                    } else {
                        this.$node.removeClass('completed');
                        this.trigger('todoListItemUncompleted', { item: this });
                    }

                    this.trigger('reapplyFilterRequest');
                }
            };
        }
});