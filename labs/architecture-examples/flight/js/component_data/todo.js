define(['lib/flight/lib/component',
        'template/clearCompletedTemplate',
        'lib/mustache/mustache'], function(defineComponent, ClearCompletedButtonTemplate, Mustache) {

    return defineComponent(todo);

    function todo() {
        this.serveClearCompletedButton = function(event, data) {
            var newValue = data.op === 'increment' ?
                data.previousValue + 1 : data.previousValue - 1;
            this.trigger('dataRequestClearCompletedButtonServed', {
                markup: this.renderClearCompletedButton(newValue)
            });
        };

        this.renderClearCompletedButton = function(value) {
            return Mustache.render(ClearCompletedButtonTemplate, {
                value: value
            });
        };

        this.serveClearCompletedItems = function() {
            this.trigger('dataRequestClearCompletedItems');
        };

        this.after('initialize', function() {
            this.on('uiRequestClearCompletedButton', this.serveClearCompletedButton);
            this.on('uiRequestClearCompletedItems', this.serveClearCompletedItems);
        });
    }
});