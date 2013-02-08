'use strict';

define(
    [
        'lib/flight/lib/component',
        'lib/mustache/mustache',
        'templates/TodoListItem'
    ],

    function(defineComponent, Mustache, TodoListItemTemplate) {
        return defineComponent(TodoListItem);

        function TodoListItem() {
            this.serveNewTodoItemRequest = function(event, data) {
                this.trigger('storeNewTodoItem', {
                    title: data.title,
                    completed: false
                });
            };

            this.newTodoItemRenderRequest = function(event, data) {
                this.trigger('newTodoItemRenderRequest', {
                    markup: this.renderTodoItem(data.title),
                    title: data.title,
                    id: data.id,
                    completed: data.completed
                });
            };

            this.renderTodoItem = function(title) {
                return Mustache.render(TodoListItemTemplate, {
                    title: title
                });
            };

            this.after('initialize', function() {
                this.on('newTodoItemRequest', this.serveNewTodoItemRequest);
                this.on('newTodoItemStored todoItemLoadedFromStorage', this.newTodoItemRenderRequest);
            });
        }
});