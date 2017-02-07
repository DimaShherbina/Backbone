(function() {
	// пространство имён
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};

// хэлпер шаблона
var template = function(id) {
	return _.template( $('#' + id).html() );
};

App.Models.Task = Backbone.Model.extend({
	validate: function(attrs) {
		if (! $.trim(attrs.title) ) {
		//alert('Имя задачи должно быть адекватным!');
		return 'Имя задачи должно быть адекватным!';
		}
	}
});

App.Views.Task = Backbone.View.extend({
	initialize: function() {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	tagName: 'li',
	template: template('taskTemplate'),
	render: function () {
		var template = this.template(this.model.toJSON());
		this.$el.html( template );
		return this;
	},
	events: {
		'click .edit': 'editTask',
		'click .delete': 'destroy'
	},
	destroy: function(){
		this.model.destroy();
	},
	remove: function(){
		this.$el.remove();
	},
	editTask: function(){
		var newTaskTitle = prompt('Как переименовать задачу?', this.model.get('title'));
		//if (!newTaskTitle) return;
		this.model.set('title', newTaskTitle, {validate: true});
	}
});

App.Collections.Task = Backbone.Collection.extend({
	model: App.Models.Task
});


 /*var task = new App.Models.Task({
	title: 'Сходить в магазин',
	priority: 4
}); */

App.Views.Tasks = Backbone.View.extend({
	tagName: "ul",

	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(task) {
		//создание нового дочернего вида
		var taskView = new App.Views.Task({ model: task });
		//дабавление его в корневой элемент
		this.$el.append(taskView.render().el);
	}
});

App.Views.AddTask = Backbone.View.extend({
	el: '#addTask',

	events: {
		'submit': 'submit'
	},

	initialize: function() {
		//console.log(this.el.innerHTML);
	},

	submit: function(e) {
		e.preventDefault();
		//.currentTarget обращается к элементу к которому применено событие??
		var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

		if (! $.trim(newTaskTitle) ) {
			alert('Неадекватное название задачи');
			return;
		}

		var newTask = new App.Models.Task({title: newTaskTitle});
		this.collection.add(newTask);
	}
});

var tasksCollection = new App.Collections.Task([
	{
		title: 'Сходить в магазин',
		priority: 4
	},
	{
		title: 'Получить почту',
		priority: 3
	},
	{
		title: 'Сходить на работу',
		priority: 5
	},
]);

var tasksView = new App.Views.Tasks({ collection: tasksCollection });


$('.tasks').html(tasksView.render().el);

var addTaskView = new App.Views.AddTask({ collection: tasksCollection });

}());

