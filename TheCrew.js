if (Meteor.isClient) {
  Template.hello.greeting = function () {
      var message = ""
      if (Meteor.userId()) {
	  message = "The Crew <br> Click to Enter"
      } else {
	  message = "Login with Facebook to Proceed"
      };
    return message;
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
