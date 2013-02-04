'use strict';

define(['lib/flight/lib/component'], function(defineComponent) {

    var todoList = function() {

        this.defaultAttrs({
            toggleAllSelector: '#toggle-all'
        });

        this.toggleAll = function() {
            console.log('Toggle all');
        };

        this.after('initialize', function() {
            this.on('click', {
                'toggleAllSelector': this.toggleAll
            });

            // Hidden by default
            this.$node.addClass('hidden');
        });

    };

    return defineComponent(todoList);
});