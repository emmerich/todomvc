'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(Todo);

        /**
         * A Todo Component represents the root application element. It provides functionality regarding the creation
         * of new Todo items.
         * @constructor
         */
        function Todo() {
            this.defaultAttrs({
                newTodoSelector: '#new-todo',
                counterSelector: '#todo-count'
            });

            this.after('initialize', function() {
                this.on('keypress', {
                    'newTodoSelector': this.handleNewTodoItemRequest
                });
            });

            /**
             * Handles a request from the UI to create a new Todo item.
             * @param event the Browser event that triggered the request
             * @param target the target element of the event.
             */
            this.handleNewTodoItemRequest = function(event, target) {
                // Take the title of the new todo item
                var title = $(target.el).val().trim();

                if(event.which === ENTER_KEY && title) {

                    // Send an event requesting the new todo item be created with the given title.
                    this.trigger('uiNewTodoItemRequest', {
                        title: title
                    });

                    // Reset the input's value
                    $(target.el).val('');

                }
            };
        }
});