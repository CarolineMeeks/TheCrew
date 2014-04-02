Session.setDefault('step',0);
Session.setDefault('playing',false);

count = Workouts.find().count();

if (Session.get('step') >= count) {
    pauseAll();
    Session.set('step', 0);
}

thisStep = Workouts.findOne({step: Session.get('step')});
    

Template.play.helpers ({
    title:  function () {
	thisStep = Workouts.findOne({"step": Session.get('step')});
//	console.log(thisStep, Session.get('step'));
	var title = thisStep.title;
	console.log(title);
	return title;
    },
    image:  function () {
	var src = thisStep.src;
	var image = '<img src="' + src + '" id="play-img" class="img-responsive">';
	return image;
    },
    audio: function() {
	var soundFile = thisStep.soundFile
	var audio = '<span ><audio id="audio" src="'+ soundFile + '" hidden="true" autostart="true" loop="false" /></span>'
	return audio
    },
    timer: function() {
	var time = thisStep.time;
	var timer = '<div id="timer" class="text-center"  data-timer="' + time + '"></div>'
	return timer
    }
});

Template.play.rendered = function() {
    $("#timer").TimeCircles({
	"start": false,
	"use_background": false,
	"fg-width": .1,
	"time": {
	    "Days": {"show": false},
	    "Hours":{"show": false},
	    "Minutes": {"show": false},
	    "Seconds": {
		"color": "#FFCC66",
		"text": ""
	    }
	}
    });
    Meteor.defer(function() {
	$("#timer").TimeCircles().addListener(function(unit, amount, total){
	    console.log("added listener", total);
	    if (total == 3) {
		$('#warnAudio').trigger('play');
	    }
	    if(total == 0) {
		//Known issue. Each new step adds a new addListener and I can't figure out how to destroy the old ones, they just keep counting backwards.
		console.log('times up', this);
		$('#audio').trigger('pause');
		$('#warnAudio').trigger('pause');
		step = Session.get('step') + 1;
		Session.set('step', step);
	    }
	    if (total == -1) {
		//This does not work!
		this.TimeCircles().stop();
		console.log('timer at -1');
	    }
	});
	if (Session.get('playing')) {
	    $('#audio').trigger('play');
	    $('#timer').TimeCircles().start();
	    $('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/pause.png');
	    $('#timer').css('background-image',"url(https://cdn1.iconfinder.com/data/icons/windows-8-metro-style/128/cat.png)");
	};
    });
    
}; 

Template.play.events({
    'tap, click #reset-session': function(e) {
	Session.set('step',0);
    },
    'tap, click #play-btn': function(e) {
	startStop(e)
    },
    'tap, click #play-img':  function(e) {
	document.getElementById('warnAudio').play();
	document.getElementById('warnAudio').pause();
	startStop(e)
    },
    'tap, click #timer':  function(e) {
	startStop(e)
    },
});


function startStop(e) {
    console.log('play button clicked',this);
    if (Session.get('playing')) {
	pauseAll();
    } else {
	$('#timer').TimeCircles().start();
	$('#audio').trigger('play');
	Session.set('playing',true);
	$('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/pause.png');
	$('#timer').css('background-image',"url(https://cdn1.iconfinder.com/data/icons/windows-8-metro-style/128/cat.png)");
    };
}

function pauseAll() {
    $('#timer').TimeCircles().stop();
    $('#audio').trigger('pause');
    $('#warnAudio').trigger('pause');
    console.log("paused audio")
    Session.set('playing',false);
    $('#timer').css('background-image', "url(https://cdn4.iconfinder.com/data/icons/sound-and-audio/32/black_4_audio_play-128.png)");
};
