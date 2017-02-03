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


var PersonView = Backbone.View.extend({
	initialize: function() {
		console.log('Class item creation complete');
	},
	tagName: 'li',

	template: _.template( $('#person-id').html() ),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
	}

})

var per = new Person;
var perView = new PersonView({model: per});


/* var Person = function(config) {
	this.name = config.name;
	this.age = config.age;
	this.job = config.job;
};

Person.prototype.walk = function() {
	return this.name + ' is walking';
}

var Nick = new Person ( {name: 'Nick', age: '25', job: 'developer'} ); */

