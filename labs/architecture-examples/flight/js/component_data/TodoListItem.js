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
                this.trigger('dataNewTodoItemRequestServed', {
                    markup: this.renderTodoItem(data.title),
                    title: data.title
                });
            };

            this.renderTodoItem = function(title) {
                return Mustache.render(TodoListItemTemplate, {
                    title: title
                });
            };

            this.after('initialize', function() {
                this.on('uiNewTodoItemRequest', this.serveNewTodoItemRequest);
            });
        }
});