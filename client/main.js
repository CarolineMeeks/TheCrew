if (Meteor.isClient) {
  Meteor.startup(function (argument) {
    // THE CODE ABOVE
      console.log('meteor.startup');
  });
}
