Template.play.helpers ({
    image:  function () {
	var src = 'Lil_White_Goth.jpg';
	var image = '<img src="' + src + '" id="play-img" style="height:500px;float:center">';
	return image;
    },
    audio: function() {
	var soundFile ="LakeIsleofInnisfree.mp3"
	var audio = '<span ><audio id="audio" src="'+ soundFile + '" hidden="true" autostart="true" loop="false" /></span>'
	return audio
    },
    timer: function() {
	var time = 10;
	var timer = '<div id="timer" style="width:250px;float:center" data-timer="' + time + '"></div>'
	return timer
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
}; 

Template.play.events({
    'click #play-btn': function(e) {
	console.log('play button clicked',this);
	if ($('#play-btn').hasClass('paused')) {
	    $('#timer').TimeCircles().start();
	    $('#audio').trigger('play');
	    $('#play-btn').removeClass('paused');
	    $('#play-btn').addClass('playing');
	    $('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/pause.png');
	    $("#timer").TimeCircles().addListener(function(unit, amount, total){
		if(total == 0) {
		    console.log('times up');
		    pauseAll();
		}
	    });

	} else {
	    pauseAll();
	};
    }
});

function pauseAll() {
    $('#timer').TimeCircles().stop();
    $('#audio').trigger('pause');
    $('#play-btn').addClass('paused');
    $('#play-btn').removeClass('playing');
    $('#play-btn').attr('src','https://cdn1.iconfinder.com/data/icons/metal/100/right.png');
};

