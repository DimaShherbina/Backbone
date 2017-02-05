var Person = Backbone.Model.extend({
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

var person = new Person();

var PeopleCollection = Backbone.Collection.extend({
	model: Person
});

var PeopleView = Backbone.View.extend({
	tagName: 'ul',

	initialize: function() {

	},

	render: function() {
		this.collection.each(function(person) {
			var personView = new PersonView({model: person});

			this.$el.append(personView.render().el);
		}, this);

		return this;

	}


});

var PersonView = Backbone.View.extend({
	initialize: function() {
	},
	tagName: 'li',

	template: _.template( $('#person-id').html() ),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}

})



var peopleCollection = new PeopleCollection([
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
	}

	]);

var peopleView = new PeopleView({collection: peopleCollection})

$(document.body).append(peopleView.render().el);
