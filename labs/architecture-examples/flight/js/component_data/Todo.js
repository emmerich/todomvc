'use strict';

define(
    [
        'lib/flight/lib/component',
        'lib/mustache/mustache',
        'templates/ClearCompletedButtonText'
    ],

    function(defineComponent, Mustache, ClearCompletedButtonTextTemplate) {
        return defineComponent(Todo);

        function Todo() {
            this.completedCount = 0;

            this.triggerButtonUpdate = function() {
                this.trigger('dataUpdateClearCompletedButton', {
                    markup: this.renderClearCompletedButton(this.completedCount)
                });
            };

            this.renderClearCompletedButton = function(value) {
                return Mustache.render(ClearCompletedButtonTextTemplate, {
                    value: value
                });
            };

            this.decrementCompletedCount = function() {
                this.completedCount--;
                this.triggerButtonUpdate();
            };

            this.incrementCompletedCount = function() {
                this.completedCount++;
                this.triggerButtonUpdate();
            };

            this.handleTodoItemDestroyed = function(event, data) {
                if(data.item.completed) {
                    this.decrementCompletedCount();
                }
            };

            this.clearCompletedItems = function() {
                this.trigger('dataClearCompletedItems');
            };

            this.after('initialize', function() {
                this.on('uiClearCompletedItems', this.clearCompletedItems);

                // We care about when items are destroyed, completed and uncompleted
                this.on('uiTodoListItemDestroyed', this.handleTodoItemDestroyed);
                this.on('uiTodoListItemCompleted', this.incrementCompletedCount);
                this.on('uiTodoListItemUncompleted', this.decrementCompletedCount);
            });
        }
});