Template.play.helpers ({
    image:  function () {
	var src = 'clock.png';
	var image = '<img src="' + src + '" id="play-img" width="40%">';
	return image;
    },
    audio: function() {
	var soundFile ="LakeIsleofInnisfree.mp3"
	var audio = '<span ><audio id="audio" src="'+ soundFile + '" hidden="true" loop="false" /></span>'
	return audio
    },
    timer: function() {
	var time = 30;
	var timer = '<div id="timer" data-timer="' + time + '"></div>'
	return timer
    }
});

Template.play.rendered = function() {
    $("#timer").TimeCircles();
}; 
