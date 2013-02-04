'use strict';

define(['lib/flight/lib/component'],
    function(defineComponent) {

    var todo = function() {

        this.defaultAttrs({
            newTodoSelector: '#new-todo'
        });

        this.newTodo = function(event, target) {
            var title = $(target.el).val().trim();
            if(event.which === ENTER_KEY && title) {
                this.trigger('uiNewTodoItemRequest', {
                    title: title
                });

                // Reset the input's value
                $(target.el).val('');
            }
        };

        this.after('initialize', function() {
            this.on('keypress', {
                'newTodoSelector': this.newTodo
            });
        });
    };

    return defineComponent(todo);
});