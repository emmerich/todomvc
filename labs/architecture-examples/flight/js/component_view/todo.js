'use strict';

define(['lib/flight/lib/component'],
    function(defineComponent) {

    var todo = function() {

        this.defaultAttrs({
            newTodoSelector: '#new-todo',
            counterSelector: '#todo-count',
            completedButtonSelect: '#clear-completed'
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

        this.decrementCounter = function() {
            var strongEl = this.$node.find(this.attr.counterSelector + ' strong');
            strongEl.text(parseInt(strongEl.text()) - 1);
        };

        this.incrementCounter = function() {
            var strongEl = this.$node.find(this.attr.counterSelector + ' strong');
            strongEl.text(parseInt(strongEl.text()) + 1);
        };

        this.incrementCompleted = function() {
            var buttonEl = this.$node.find(this.attr.completedButtonSelect);
            var prev = parseInt(buttonEl.text().split('(')[1].split(')')[0]);

            buttonEl.text('Clear completed (' + (prev + 1) + ')');
        };

        this.decrementCompleted = function() {
            var buttonEl = this.$node.find(this.attr.completedButtonSelect);
            var prev = parseInt(buttonEl.text().split('(')[1].split(')')[0]);

            buttonEl.text('Clear completed (' + (prev - 1) + ')');
        };

        this.handleListItemToggle = function(ev, data) {
            if(data.toggle) {
                this.decrementCounter();
            } else {
                this.incrementCounter();
            }
        };

        this.after('initialize', function() {
            this.on('keypress', {
                'newTodoSelector': this.newTodo
            });

            this.on(document, 'uiTodoListItemDestroyed uiTodoListItemCompleted', this.decrementCounter);
            this.on(document, 'uiTodoListItemCreated uiTodoListItemUncompleted', this.incrementCounter);
            this.on(document, 'uiTodoListItemCompleted', this.incrementCompleted);
            this.on(document, 'uiTodoListItemUncompleted', this.decrementCompleted);
        });
    };

    return defineComponent(todo);
});