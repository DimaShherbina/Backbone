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

});

App.Views.Task = Backbone.View.extend({
	tagName: 'li',
	template: template('taskTemplate'),
	render: function () {
		var template = this.template(this.model.toJSON());
		this.$el.html( template );
		return this;
	},
	events: {
		'click .edit': 'editTask'
	},
	editTask: function(){
		var newTaskTitle = prompt('Как переименовать задачу?', this.model.get('title'));
		this.model.set('title', newTaskTitle);
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


}());