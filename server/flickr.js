var flickrKey = 'c8ab62771a70ea25dd73b1c5bfc062fc';
var myFlickrId = '82029652@N03';

myFavList = function(apiKey, userId) {
    Meteor.http.call("GET", "http://api.flickr.com/services/rest/?method=flickr.favorites.getPublicList&api_key="+apiKey+"&user_id="+userId+"&extras=tags&format=json&nojsoncallback=1", {},function(error, result) {
	console.log(result.statusCode);
	if (result.statusCode == 200) {
//	    console.log(result.content);
	    var favsResult = JSON.parse(result.content);
	    console.log(favsResult.photos.photo[1]);
	    return favsResult;
	};
    });
};

myFavs = myFavList(flickrKey, myFlickrId);
console.log(myFavs.photos.photo[1]);
//randomPhoto = Math.floor(Math.random()*(myFavs.photos.total));

