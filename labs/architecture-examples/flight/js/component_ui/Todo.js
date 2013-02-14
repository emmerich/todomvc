'use strict';

define(
    [
        'lib/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(Todo);

        /**
         * A Todo Component represents the root application element. It provides functionality regarding the creation
         * of new Todo items.
         * @constructor
         */
        function Todo() {
            this.footerVisible = false;

            this.defaultAttrs({
                newTodoSelector: '#new-todo',
                counterSelector: '#todo-count',
                showAllLink: '#filters a[href="#/"]',
                showActiveLink: '#filters a[href="#/active"]',
                showCompletedLink: '#filters a[href="#/completed"]'
            });

            this.after('initialize', function() {
                this.on('keypress', {
                    'newTodoSelector': this.handleNewTodoItemRequest
                });

                this.on(document, 'todoListPopulated', this.showFooter);
                this.on(document, 'todoListEmptied', this.hideFooter);

                this.on(document, 'showActiveItems showCompletedItems showAllItems', this.highlightFooterLink);

                this.hideFooter();
            });

            /**
             * Handles a request from the UI to create a new Todo item.
             * @param event the Browser event that triggered the request
             * @param target the target element of the event.
             */
            this.handleNewTodoItemRequest = function(event, target) {
                // Take the title of the new todo item
                var title = $(target.el).val().trim();

                if(event.which === ENTER_KEY && title) {

                    // Send an event requesting the new todo item be created with the given title.
                    this.trigger('newTodoItemRequest', {
                        title: title
                    });

                    // Reset the input's value
                    $(target.el).val('');

                }
            };

            this.showFooter = function() {
                if(!this.footerVisible) {
                    this.$node.find('#footer').removeClass('hidden');
                    this.footerVisible = true;
                }
            };

            this.hideFooter = function() {
                if(this.footerVisible) {
                    this.$node.find('#footer').addClass('hidden');
                    this.footerVisible = false;
                }
            };

            this.highlightFooterLink = function(event) {
                var toShow;

                switch(event.type) {
                    case 'showAllItems':
                        toShow = this.attr.showAllLink;
                        break;
                    case 'showCompletedItems':
                        toShow = this.attr.showCompletedLink;
                        break;
                    case 'showActiveItems':
                        toShow = this.attr.showActiveLink;
                        break;
                }

                this.$node.find('#filters a.selected').removeClass('selected');
                this.$node.find(toShow).addClass('selected');
            };
        }
});