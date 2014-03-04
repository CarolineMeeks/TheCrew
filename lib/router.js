Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { 
	return [
	    Meteor.subscribe('workouts')
	]
   }
});

Router.map(function() {
    this.route('splash', {path: '/'});
    this.route('play', { 
	path: '/play',
	template: 'play',
	data: function() {return Workouts.find();}
    });
});

Router.before(function() { clearErrors() });
