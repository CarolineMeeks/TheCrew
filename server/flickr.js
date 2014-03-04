var flickrKey = 'c8ab62771a70ea25dd73b1c5bfc062fc';
var myFlickrId = '82029652@N03';
var catRestGal = '82006598-72157641782500934'
var catJumpGal = '82006598-72157641781132923'

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

createWorkout = function() {
    Meteor.setTimeout(function() {
	if (restFlickr && jumpFlickr) {
	    workout = []
	    console.log(jumpFlickr[Math.floor(Math.random()*jumpFlickr.length)].url_q);
	    step0 = {
		step: 0,
		title:  "Get Ready to Start!",
		src: jumpFlickr[Math.floor(Math.random()*jumpFlickr.length)].url_q,
		soundFile: "Davie_Jones.mp3",
		time: 10};
	    Workouts.insert(step0);
	    step1 = {
		step: 1,
		title:  "Jumping Jacks",
		src: jumpFlickr[Math.floor(Math.random()*jumpFlickr.length)].url_q,
		soundFile: "",
		time: 30}
	    Workouts.insert(step1);
	    console.log('workout created')
	} else {
	    console.log('Not yet on flickr');
	    workout = createWorkout() 
	};
    }, 1000);
};

if (Workouts.find().count() === 0) {
    createWorkout();
};

//randomPhoto = Math.floor(Math.random()*(myFavs.photos.total));

