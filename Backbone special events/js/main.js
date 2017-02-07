(function() {
	// пространство имён
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	};

var vent = _.extend({}, Backbone.Events);

App.Views.SpecialTasks = Backbone.View.extend({
	initialize: function() {
		vent.on('specialTasks:show', this.show, this);
	},
	show: function(id) {
		console.log('Show Special Task with id ' + id);
	}
});

App.Router = Backbone.Router.extend({
	routes: {
		''                 : 'start',
		'specialTasks/:id' : 'showSpecialTasks'
	},

	showSpecialTasks: function(id){
		vent.trigger('specialTasks:show', id);
	},

	start: function() {
		console.log('Стартовая страница');
	}

});

new App.Views.SpecialTasks;

new App.Router();
Backbone.history.start();



}());

