'use strict';

define(['lib/flight/lib/component',
        'component_view/todoListItem'],
    function(defineComponent, ToDoListItem) {

    var todo = function() {

        this.defaultAttrs({
            newTodoSelector: '#new-todo'
        });

        this.newTodo = function(event, target) {
            if(event.which === ENTER_KEY && $(target.el).val().trim()) {
                console.log('New todo', $(target.el).val().trim());

                var el = $('<li></li>');

                el.appendTo(this.$node);

                ToDoListItem.attachTo(el, { title: $(target.el).val().trim() });
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