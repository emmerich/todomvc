'use strict';

var ENTER_KEY = 13;

define(
    [
        'component_ui/Todo',
        'component_ui/TodoList',
        'component_ui/ClearCompletedButton',
        'component_ui/TodoCount',
        'component_data/Todo',
        'component_data/TodoList',
        'component_data/TodoListItem',
        'component_data/LocalStorage',
        'component_data/TodoRouter'
    ],

    function(ToDo, ToDoList, ClearCompletedButton, TodoCount,
        ToDoData, ToDoListData, ToDoListItemData, LocalStorage, TodoRouter) {

    var initialize = function() {
        ToDoData.attachTo(document);
        ToDoListData.attachTo(document);
        ToDoListItemData.attachTo(document);
        LocalStorage.attachTo(document);
        TodoRouter.attachTo(document);

        ToDo.attachTo('#todoapp');
        ToDoList.attachTo('#main');
        ClearCompletedButton.attachTo('#clear-completed');
        TodoCount.attachTo('#todo-count');

        $(document).trigger('loadFromStorage');
    };

    // Start the app when the document is loaded
    $(function() {
        initialize();
    });
});