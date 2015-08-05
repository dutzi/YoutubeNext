'use strict';
var nextVideo;

function onButtonClick(e) {
	var parent = e.currentTarget.parentElement;
	if (nextVideo) {
		nextVideo.classList.remove('is-playing-next');
	}
	if (nextVideo !== parent) {
		nextVideo = parent;
		nextVideo.classList.add('is-playing-next');
	} else {
		nextVideo = null;
	}
	e.preventDefault();
}

function updateUI() {
	var btnTemplate = document.createElement('a');
	btnTemplate.className = 'play-next-button';
	btnTemplate.href = '#';

	var videos = document.querySelectorAll('.related-list-item');
	for (var i = 0; i < videos.length; i++) {
		var playNextButton = btnTemplate.cloneNode(true);
		playNextButton.addEventListener('click', onButtonClick);
		videos[i].appendChild(playNextButton);
	}

	var video = document.querySelector('video');
	if (video) {
		video.addEventListener('ended', function () {
			if (nextVideo) {
				var videoUrl = nextVideo.querySelector('.content-link').href;
				window.location = videoUrl;
				nextVideo = null;
			}
		});
	}
}
updateUI();

var lastWindowLocation;
setInterval(function () {
	if (lastWindowLocation !== window.location.href) {
		lastWindowLocation = window.location.href;
		setTimeout(updateUI, 2000);
	}

}, 1000);