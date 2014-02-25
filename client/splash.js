Template.splash.helpers ({
	message:  function () {
	    var message = ""
	    message = "The Crew <br> Click to Enter"
	   // if (Meteor.userId()) {
//		message = "The Crew <br> Click to Enter"
//	    } else {
//		message = "Login with Facebook to Proceed"
//	    };
	    return message;
	}
});

Template.splash.events({
    'click #splashimg' : function (e) {
	e.preventDefault();
	console.log('splash clicked');
//	if (Meteor.userId()) {
	    window.location = "/play";
//	};
    },
    'click #greeting' : function (e) {
	e.preventDefault();
	console.log('splash clicked');
//	if (Meteor.userId()) {
	    window.location = "/play";
//	};
    }
});


