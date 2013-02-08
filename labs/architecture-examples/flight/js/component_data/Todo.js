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
                this.trigger('updateClearCompletedButtonRequest', {
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

                if(this.completedCount <= 0) {
                    this.trigger('hideClearCompletedButton');
                }
            };

            this.incrementCompletedCount = function() {
                this.completedCount++;
                this.triggerButtonUpdate();

                if(this.completedCount > 0) {
                    this.trigger('showClearCompletedButton');
                }
            };

            this.handleTodoItemDestroyed = function(event, data) {
                if(data.item.completed) {
                    this.decrementCompletedCount();
                }
            };

            this.clearCompletedItems = function() {
                this.trigger('clearCompletedItems');
            };

            this.after('initialize', function() {
                this.on('clearCompletedItemsRequest', this.clearCompletedItems);

                // We care about when items are destroyed, completed and uncompleted
                this.on('todoListItemDestroyed', this.handleTodoItemDestroyed);
                this.on('todoListItemCompleted', this.incrementCompletedCount);
                this.on('todoListItemUncompleted', this.decrementCompletedCount);
            });
        }
});