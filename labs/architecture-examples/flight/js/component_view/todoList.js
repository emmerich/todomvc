'use strict';

define(['lib/flight/lib/component',
        'component_view/todoListItem'], function(defineComponent, todoListItem) {

    var todoList = function() {

        this.defaultAttrs({
            toggleAllSelector: '#toggle-all',
            listSelector: '#todo-list'
        });

        this.toggleAll = function() {
            this.trigger('uiToggleAll');
        };

        this.renderNewTodo = function(event, data) {
            var todoListItemEl = $(data.markup).appendTo(this.$node.find(this.attr.listSelector));
            todoListItem.attachTo(todoListItemEl, { title: data.title });
            this.trigger('uiTodoListItemCreated');
        };

        this.after('initialize', function() {
            this.on('click', {
                'toggleAllSelector': this.toggleAll
            });

            this.on(document, 'dataNewTodoItemRequestServed', this.renderNewTodo);
        });

    };

    return defineComponent(todoList);
});