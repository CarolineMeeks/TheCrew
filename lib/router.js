Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
//  waitOn: function() { return 
//  waitOn: function() { 
//      return [
//	  Meteor.subscribe('userHighlights'),
//	  Meteor.subscribe('passages')
 //     ]
//  }
});

Router.map(function() {
    this.route('splash', {path: '/'});
    this.route('play', { 
	path: '/play',
	template: 'play'
    });
});

Router.before(function() { clearErrors() });
