define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(Store);

        function Store() {
            this.namespace = 'todos-flight';

            this.after('initialize', function() {
                this.on('storeNewTodoItem', this.storeNewTodo);
                this.on('todoListItemChanged', this.updateTodo);
                this.on('todoListItemDestroyed', this.remove);
                this.on('loadFromStorage', this.load);

                this.on('reapplyFilterRequest', this.reapplyFilter);

                this.on(document, 'showActiveItems showCompletedItems showAllItems', this.changeCurrentFilter);

                if(!localStorage.getItem(this.namespace)) {
                    localStorage.setItem(this.namespace, JSON.stringify({
                        currentFilter: 'showAllItems',
                        todos: []
                    }));
                }
            });

            this.storeNewTodo = function(event, data) {
                var id = this.generateId(),
                    store = this.get(),
                    item = {
                        id: id,
                        title: data.title,
                        completed: data.completed
                    };

                store.todos.push(item);
                this.set(store);

                this.trigger('newTodoItemStored', item);
            };

            this.changeCurrentFilter = function(event) {
                var store = this.get();
                store.currentFilter = event.type;
                this.set(store);
            };

            this.updateTodo = function(event, data) {
                var store = this.get(),
                    id = data.id;

                for(var i = 0; i<store.todos.length; i++) {
                    if(store.todos[i].id === id) {
                        $.extend(store.todos[i], data);
                    }
                }

                this.set(store);
            };

            this.generateId = function(a, b) {
                // https://gist.github.com/1308368
                for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b;
            };

            this.get = function() {
                return JSON.parse(localStorage.getItem(this.namespace));
            };

            this.set = function(data) {
                return localStorage.setItem(this.namespace, JSON.stringify(data));
            }

            this.load = function() {
                var store = this.get();

                for(var i = 0; i<store.todos.length; i++) {
                    this.trigger('todoItemLoadedFromStorage', store.todos[i]);
                }

                this.reapplyFilter();
            }

            this.reapplyFilter = function() {
                console.log('Triggering', this.get().currentFilter);
                this.trigger(this.get().currentFilter);
            };

            this.remove = function(event, data) {
                var store = this.get();

                for(var i = 0; i<store.todos.length; i++) {
                    if(store.todos[i].id === data.item.attr.id) {
                        store.todos.splice(i, 1);
                    }
                }

                this.set(store);
            }
        }
});
