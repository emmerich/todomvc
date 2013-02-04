'use strict';

var ENTER_KEY = 13;

define(['component_view/todo', 'component_view/todoList',
        'component_data/todoList', 'component_data/todoListItem'],
    function(ToDo, ToDoList,
        ToDoListData, ToDoListItemData) {

    var initialize = function() {
        ToDoListData.attachTo(document);
        ToDoListItemData.attachTo(document);
        ToDo.attachTo('#todoapp');
        ToDoList.attachTo('#main');
    };

    // Start the app when the document is loaded
    $(function() {
        initialize();
    });
});