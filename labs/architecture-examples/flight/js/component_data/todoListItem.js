define(['lib/flight/lib/component',
        'template/todoListItemTemplate',
        'lib/mustache/mustache'], function(defineComponent, todoListItemTemplate, Mustache) {

    return defineComponent(todoListItem);

    function todoListItem() {

        this.serveNewTodoItemRequest = function(event, data) {
            this.trigger('dataNewTodoItemRequestServed', {
                markup: this.renderTodoItem(data.title),
                title: data.title
            });
        };

        this.renderTodoItem = function(title) {
            return Mustache.render(todoListItemTemplate, {
                title: title
            });
        };

        this.after('initialize', function() {
            this.on('uiNewTodoItemRequest', this.serveNewTodoItemRequest);
        });
    }
});