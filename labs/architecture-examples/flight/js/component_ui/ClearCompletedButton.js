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
            this.after('initialize', function() {
                this.on('click', this.clearCompletedTodoItems);
                this.on(document, 'dataUpdateClearCompletedButton', this.updateButtonText);
            });

            /**
             * Trigger a request to clear all completed items.
             */
            this.clearCompletedTodoItems = function() {
                this.trigger('uiClearCompletedItems');
            };

            /**
             * Update the text value of the button.
             */
            this.updateButtonText = function(event, data) {
                this.$node.text(data.markup);
            };
        }
    }
);