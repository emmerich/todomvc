'use strict';

var ENTER_KEY = 13;

define(['component_view/todo', 'component_view/todoList'], function(ToDo, ToDoList) {

    var initialize = function() {
        ToDo.attachTo('#todoapp');
        ToDoList.attachTo('#main');
    };

    // Start the app when the document is loaded
    $(function() {
        initialize();
    });
});