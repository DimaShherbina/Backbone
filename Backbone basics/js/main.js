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


// Модель человека
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Dima',
		age: 23,
		job: 'frontend developer'
	},

	validate: function(attrs) {
		console.log(attrs);

		if (attrs.age <= 0) {
			return 'Возраст должен быть положительным';
		}


		if (!attrs.name) {
			return 'Отсутствует имя';
		}

		if (!attrs.job) {
			return this.set({job: 'Unemployed'});
		}
	},


	walk: function() {
		return this.get('name') + ' is walking.';
	},
	human: function() {
		return this.get('name') + ' is human';
	}

});

var person = new App.Models.Person();


// Список людей
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});

// Вид списка людей
App.Views.People = Backbone.View.extend({
	tagName: 'ul',

	initialize: function() {

	},

	render: function() {
		this.collection.each(function(person) {
			var personView = new App.Views.Person({model: person});

			this.$el.append(personView.render().el);
		}, this);

		return this;

	}


});

// Вид одного человека
App.Views.Person = Backbone.View.extend({
	initialize: function() {
	},
	tagName: 'li',

	template: template('person-id'),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}

})



var peopleCollection = new App.Collections.People([
	{
		name: 'Геннадий',
		age: 40,
		job: 'Unemployed'
	},
	{
		name: 'Josh',
		age: 32,
		job: 'Crafter'
	},
	{
		name: 'Julia',
		job: 'Designer'
	},
	{
		name: 'Vasiliy',
		age: 34,
		job: 'Gladiator'
	}

	]);

var peopleView = new App.Views.People({collection: peopleCollection})

$(document.body).append(peopleView.render().el);

}());
