'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(ClearCompletedButton);

        /**
         * The Clear Completed Button handles update requests to change the text of the button, and fires
         * appropriate events when the button is clicked.
         * @constructor
         */
        function ClearCompletedButton() {
            this.hidden = true;

            this.after('initialize', function() {
                this.on('click', this.clearCompletedTodoItems);
                this.on(document, 'updateClearCompletedButtonRequest', this.updateButtonText);

                this.on(document, 'hideClearCompletedButton', this.hide);
                this.on(document, 'showClearCompletedButton', this.show);

                this.on(document, 'todoItemLoadedFromStorage', this.handleItemLoad);
            });

            /**
             * Trigger a request to clear all completed items.
             */
            this.clearCompletedTodoItems = function() {
                this.trigger('clearCompletedItemsRequest');
            };

            /**
             * Update the text value of the button.
             */
            this.updateButtonText = function(event, data) {
                this.$node.text(data.markup);
            };

            this.hide = function() {
                if(!this.hidden) {
                    this.$node.addClass('hidden');
                    this.hidden = true;
                }
            };

            this.show = function() {
                if(this.hidden) {
                    this.$node.removeClass('hidden');
                    this.hidden = false;
                }
            };

            this.handleItemLoad = function(event, data) {
                if(data.completed) {
                    this.show();
                }
            };
        }
    }
);