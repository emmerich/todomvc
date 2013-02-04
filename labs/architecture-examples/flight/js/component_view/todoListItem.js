'use strict';

define(['lib/flight/lib/component'],
    function(defineComponent) {

    var todoListItem = function() {

        this.title = '';
        this.completed = false;

        this.defaultAttrs({
            destroySelector: '.destroy',
            toggleSelector: '.toggle'
        });

        this.destroy = function() {
            console.log('Destroy');
        };

        this.handleCheckboxClick = function() {
            this.completed = !this.completed;
            this.toggle(this.completed);
        };

        this.handleToggleAll = function(event, data) {
            this.completed = data.toggle;
            this.toggle(this.completed);
        };

        this.toggle = function(toggle) {
            // Set the checkbox
            this.$node.find(this.attr.toggleSelector).attr('checked', toggle);
        };

        this.after('initialize', function() {
            this.on('click', {
                'destroySelector': this.destroy,
                'toggleSelector': this.handleCheckboxClick
            });

            this.on(document, 'dataToggleAll', this.handleToggleAll);
        });
    };

    return defineComponent(todoListItem);
});