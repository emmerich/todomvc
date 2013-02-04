'use strict';

define(['lib/flight/lib/component'], function(defineComponent) {

    var todoListItem = function() {
        this.title = '';
        this.completed = false;


    };

    return defineComponent(todoListItem);
});