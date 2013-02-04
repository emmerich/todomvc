define(['lib/flight/lib/component'], function(defineComponent) {

    return defineComponent(todoList);

    function todoList() {

        this.toggleAllStatus = false;

        this.toggleAll = function() {
            this.toggleAllStatus = !this.toggleAllStatus;
            this.trigger('dataToggleAll', {
                toggle: this.toggleAllStatus
            });
        };

        this.after('initialize', function() {
            this.on('uiToggleAll', this.toggleAll);
        });
    }
});