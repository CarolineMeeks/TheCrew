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
	var timer = '<div id="timer" style="width:250px;float:center" data-timer="' + time + '"></div>'
	return timer
    },
    warnAudio: function() {
	var warnAudio = '<span><audio id="warnAudio" src="2meow-3sec.wav" hidden="true" autostart="true" loop="false" /></span>'
	return warnAudio
    }
});

Template.play.rendered = function() {
    $("#timer").TimeCircles({
	"start": false,
	"use_background": false,
	"fg-width": 1.0,
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
	    if (total == 3) {
		$('#warnAudio').trigger('play');
	    }
	    if(total == 0) {
		console.log('times up');
		step = Session.get('step') + 1;
		Session.set('step', step);
		$('#audio').trigger('stop');
		$('#warnAudio').trigger('stop');
	    }
	});
	if (Session.get('playing')) {
	    $('#audio').trigger('play');
	    $('#timer').TimeCircles().start();
	    $('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/pause.png');
	};
    });
    
}; 

Template.play.events({
    'click #reset-session': function(e) {
	Session.set('step',0);
    },
    'click #play-btn': function(e) {
	console.log('play button clicked',this);
	if (Session.get('playing')) {
	    pauseAll();
	} else {
	    $('#timer').TimeCircles().start();
	    $('#audio').trigger('play');
	    Session.set('playing',true);
	    $('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/pause.png');
	};
    }
});

function pauseAll() {
    $('#timer').TimeCircles().stop();
    $('#audio').trigger('pause');
    Session.set('playing',false);
    $('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/right.png');
};

