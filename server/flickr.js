var flickrKey = 'c8ab62771a70ea25dd73b1c5bfc062fc';
var myFlickrId = '82029652@N03';
var catRestGal = '82006598-72157641782500934';
var catJumpGal = '82006598-72157641781132923';
var catReadyGal = '82006598-72157641862219904';
var catWallGal = '82006598-72157641779189255';
var catPushupGal = '82006598-72157641779019495';

galList = function(apiKey, galId, callback) {
    requestUrl = "http://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key="+apiKey+"&gallery_id="+galId+"&extras=tags,url_q,owner_name, licence&format=json&nojsoncallback=1"
    Meteor.http.call("GET", requestUrl, {},function(error, result) {
	console.log(result.statusCode, requestUrl);
	if (result.statusCode == 200) {
	    //console.log(result.content);
	    var resultContent = JSON.parse(result.content);
	    photos = resultContent.photos.photo;
	    //console.log(resultContent.photos.photo[1]);
	    if (callback && typeof(callback) === "function") {  
		callback();
	    }
	} else {
	    console.log('API fail', result.statusCode);
	};
    });
};

var restFlickr = ""
galList(flickrKey, catRestGal,function() {
    //console.log('photos set to ', photos);
    restFlickr = photos;
}); 

var jumpFlickr = ""
galList(flickrKey, catJumpGal, function() {
    //console.log('photos set to ', photos);
    jumpFlickr = photos;
});

var readyFlickr = ""
galList(flickrKey, catReadyGal, function() {
    //console.log('photos set to ', photos);
    readyFlickr = photos;
});

var wallFlickr = ""
galList(flickrKey, catWallGal, function() {
    //console.log('photos set to ', photos);
    wallFlickr = photos;
});

var pushupFlickr = ""
galList(flickrKey, catPushupGal, function() {
    //console.log('photos set to ', photos);
    pushupFlickr = photos;
});


insertRest = function(step) {
    var rest = {
	step: step,
	title:  "Rest",
	src: restFlickr[Math.floor(Math.random()*restFlickr.length)].url_q,
	soundFile: "purr-lick.wav",
	time: 10};
    Workouts.insert(rest);
}

createWorkout = function() {
    Meteor.setTimeout(function() {
	if (restFlickr && jumpFlickr && readyFlickr) {
	    workout = []
	    console.log(jumpFlickr[Math.floor(Math.random()*jumpFlickr.length)].url_q);
	    step0 = {
		step: 0,
		title:  "Ready? Click to Start",
		src: readyFlickr[Math.floor(Math.random()*readyFlickr.length)].url_q,
		soundFile: "",
		time: 5};
	    Workouts.insert(step0);
	    jumpJack = {
		step: 1,
		title:  "Jumping Jacks",
		src: jumpFlickr[Math.floor(Math.random()*jumpFlickr.length)].url_q,
		soundFile: "",
		time: 30}
	    Workouts.insert(jumpJack);
	    insertRest(2);
	    pushup = {
		step: 3,
		title:  "Push-Ups",
		src: pushupFlickr[Math.floor(Math.random()*pushupFlickr.length)].url_q,
		soundFile: "",
		time: 30};
	    insertRest(4);
	    console.log('workout created')
	} else {
	    console.log('Not yet on flickr');
	    workout = createWorkout() 
	};
    }, 1000);
};

//eventually will want more then one workshops.
if (Workouts.find().count() === 0) {
    createWorkout();
};

//randomPhoto = Math.floor(Math.random()*(myFavs.photos.total));

