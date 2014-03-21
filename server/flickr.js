
var flickrKey = 'c8ab62771a70ea25dd73b1c5bfc062fc';
var myFlickrId = '82029652@N03';
restTime = 10
exerciseTime = 30
rest = {title: "Rest", galId: '82006598-72157641782500934', time: restTime }

var steps = {}
steps[0] = {title: "Click when Ready", galId: '82006598-72157641862219904', time: 5};
steps[1] = { title: "Jumping Jacks", galId: '82006598-72157641781132923', time: exerciseTime}
steps[2] = rest
steps[3] = {title: "Wall Sit", galId: '82006598-72157641779189255', time: exerciseTime};
steps[4] = rest
steps[5] = {title: "Pushup", galId: '82006598-72157641779019495', time: exerciseTime};
steps[6] = rest

galList = function(apiKey, galId, thisStep, callback) {
    requestUrl = "http://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key="+apiKey+"&gallery_id="+galId+"&extras=tags,url_q,url_m,url_n,url_z,owner_name, licence&format=json&nojsoncallback=1"
    Meteor.http.call("GET", requestUrl, {},function(error, result) {
	console.log(result.statusCode, requestUrl);
	if (result.statusCode == 200) {
	    //console.log(result.content);
	    var resultContent = JSON.parse(result.content);
	    photos = resultContent.photos.photo;
	    //console.log(resultContent.photos.photo[1]);
	    if (callback && typeof(callback) === "function") {  
		callback(thisStep);
	    }
	} else {
	    console.log('API fail', result.statusCode);
	};
    });
};

for (var step in steps) {
    console.log(steps[step].galId)
    galList(flickrKey, steps[step].galId, step, function(thisStep) {
	//I am passing through step because otherwise its not syncronous.
	steps[thisStep].photos = photos;
	console.log('put in photos for ', steps[thisStep].title);
    });
};


createWorkout = function() {
    Meteor.setTimeout(function() {
	for (step in steps) {
	    if (steps[step].photos == null) {
		console.log(steps[step].title,'Not yet on flickr');
		workout = createWorkout() 
		return
	    } else {
		console.log('found photos '+steps[step].photos.length+steps[step].title);
	    }
	}
	    
	for (step in steps) {
	    
	    stepData = {
		step: parseInt(step),
		title:  steps[step].title,
		src: steps[step].photos[Math.floor(Math.random()*steps[step].photos.length)].url_z,
		soundFile: "",
		time: steps[step].time};
	    Workouts.insert(stepData);
	    console.log(stepData)
	};
    }, 1000);
};

//eventually will want more then one workshops.
if (Workouts.find().count() === 0) {
    createWorkout();
};

//randomPhoto = Math.floor(Math.random()*(myFavs.photos.total));

