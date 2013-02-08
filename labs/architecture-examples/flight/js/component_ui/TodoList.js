'use strict';

define(
    [
        'lib/flight/lib/component',
        'component_ui/TodoListItem'
    ],

    function(defineComponent, TodoListItem) {
        return defineComponent(TodoList);

        /**
         * The Todo List is the actual list component of the application. It handles the toggling of all list items
         * and the appending of new items to the list.
         * @constructor
         */
        function TodoList() {
            this.after('initialize', function() {
                this.on('click', { 'toggleAllSelector': this.toggleAll });
                this.on(document, 'dataNewTodoItemRequestServed', this.renderNewTodo);
            });

            this.defaultAttrs({
                toggleAllSelector: '#toggle-all',
                listSelector: '#todo-list'
            });

            /**
             * Tell the todo list items to toggle themselves when toggle all is pressed.
             */
            this.toggleAll = function() {
                this.trigger('uiToggleAll');
            };

            /**
             * Handles the serving of a new todo list item by appending it to the list.
             * @param event the new todo item served event.
             * @param data the data containing the title and markup.
             */
            this.renderNewTodo = function(event, data) {
                // Append the markup to the todo list element
                var todoListItemEl = $(data.markup).appendTo(this.$node.find(this.attr.listSelector));

                // Attach a new TodoListItem component to the element
                TodoListItem.attachTo(todoListItemEl, { title: data.title });

                this.trigger('uiTodoListItemCreated');
            };
        }
});