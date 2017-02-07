(function() {
	// пространство имён
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	};

// хэлпер шаблона
var template = function(id) {
	return _.template( $('#' + id).html() );
};

App.Router = Backbone.Router.extend({
	routes: {
		''                : 'index',
		'page/:id/*simbo' : 'page',
		'search/:query'   : 'search',
		'*other'               : 'default'
	},
	index: function() {
		console.log('Всем привет!');
	},

	page: function(id, simbo) {
		console.log('Это роут page ' + id + ' !!');
		console.log(simbo);
	},

	search: function(query) {

	},

	default: function(other) {
		alert('Хмм... Вы уверены, что вы попали туда куда хотели? Вы находитесь на роуте ' + other);
	}

});

new App.Router();
Backbone.history.start();



}());

