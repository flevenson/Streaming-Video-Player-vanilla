if (Hls.isSupported()) {
    console.log('HLS Supported!');
    var MainVideoControls = /** @class */ (function () {
        function MainVideoControls(video, vidCurrentTime, vidProgress, seekBar, vidDuration, playButton, playButtonIcon, draggableCircle, isDragging) {
            this.video = video;
            this.vidCurrentTime = vidCurrentTime;
            this.vidProgress = vidProgress;
            this.seekBar = seekBar;
            this.vidDuration = vidDuration;
            this.playButton = playButton;
            this.playButtonIcon = playButtonIcon;
            this.draggableCircle = draggableCircle;
            this.isDragging = isDragging;
            this.video = video;
            this.vidCurrentTime = vidCurrentTime;
            this.vidProgress = vidProgress;
            this.seekBar = seekBar;
            this.vidDuration = vidDuration;
            this.playButton = playButton;
            this.playButtonIcon = playButtonIcon;
            this.draggableCircle = draggableCircle;
            this.isDragging = isDragging;
        }
        MainVideoControls.prototype.togglePlaying = function () {
            if (this.video.paused) {
                this.video.play();
                this.playButtonIcon.setAttribute('src', './assets/pause.svg');
            }
            else {
                this.video.pause();
                this.playButtonIcon.setAttribute('src', './assets/play-sign.svg');
            }
        };
        MainVideoControls.prototype.updateProgressBar = function () {
            this.vidProgress.style.width = ((this.video.currentTime / this.video.duration) * 100 + "%");
            if (!this.isDragging) {
                this.draggableCircle.style.left = (this.vidProgress.getBoundingClientRect().right - 55 + "px");
            }
        };
        MainVideoControls.prototype.seek = function (event) {
            var seekBarEnd = this.seekBar.getBoundingClientRect().right;
            var seekBarStart = this.seekBar.getBoundingClientRect().left;
            var clickLocation = event.clientX - seekBarStart;
            var seekBarLength = seekBarEnd - seekBarStart;
            this.video.currentTime = (clickLocation / seekBarLength) * this.video.duration;
            this.video.play();
            this.playButtonIcon.setAttribute('src', './assets/pause.svg');
        };
        MainVideoControls.prototype.makeBallDraggable = function (elem) {
            var boundThis = this;
            elem.onmousedown = dragMouseDown;
            var positionOne = 0;
            var positionTwo = 0;
            function dragMouseDown(e) {
                boundThis.isDragging = true;
                e = e || window.event;
                e.preventDefault();
                positionTwo = e.clientX;
                document.onmousemove = drag;
                document.onmouseup = stopDragging;
            }
            function drag(e) {
                e = e || window.event;
                e.preventDefault();
                positionOne = positionTwo - e.clientX;
                positionTwo = e.clientX;
                elem.style.left = (elem.offsetLeft - positionOne) + "px";
            }
            function stopDragging() {
                boundThis.isDragging = false;
                document.onmouseup = null;
                document.onmousedown = null;
                document.onmousemove = null;
            }
        };
        return MainVideoControls;
    }());
    var TimeSettings = /** @class */ (function () {
        function TimeSettings() {
        }
        TimeSettings.prototype.setTime = function (time) {
            var minutes = Math.floor(time / 60);
            var seconds = (('0' + Math.floor(time - minutes * 60)).substr(-2));
            return minutes + ":" + seconds;
        };
        return TimeSettings;
    }());
    var VideoOptions = /** @class */ (function () {
        function VideoOptions(videoOptionOne, videoOptionTwo) {
            this.videoOptionOne = videoOptionOne;
            this.videoOptionTwo = videoOptionTwo;
            this.videoOptionOne = videoOptionOne;
            this.videoOptionTwo = videoOptionTwo;
        }
        return VideoOptions;
    }());
    var mainVideoControls_1 = new MainVideoControls(document.querySelector('.video-main'), document.querySelector('.current-time'), document.querySelector('.progress-fg'), document.querySelector('.progress-bg'), document.querySelector('.duration'), document.querySelector('.play-btn'), document.querySelector('.play-icon'), document.querySelector('.draggable-circle'), false);
    var timeSettings_1 = new TimeSettings;
    var videoOptions = new VideoOptions(document.querySelector('.video-option-1'), document.querySelector('.video-option-2'));
    mainVideoControls_1.playButton.onclick = function () {
        mainVideoControls_1.togglePlaying();
    };
    mainVideoControls_1.video.ontimeupdate = function () {
        mainVideoControls_1.vidCurrentTime.innerText = timeSettings_1.setTime(mainVideoControls_1.video.currentTime);
        mainVideoControls_1.updateProgressBar();
    };
    mainVideoControls_1.video.onloadedmetadata = function () {
        mainVideoControls_1.vidDuration.innerText = timeSettings_1.setTime(mainVideoControls_1.video.duration);
    };
    mainVideoControls_1.seekBar.onclick = function (event) {
        mainVideoControls_1.seek(event);
    };
    mainVideoControls_1.makeBallDraggable(mainVideoControls_1.draggableCircle);
    var hls_1 = new Hls();
    videoOptions.videoOptionOne.onclick = function () {
        hls_1.attachMedia(mainVideoControls_1.video);
        hls_1.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls_1.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8");
            hls_1.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log("manifest loaded, found " + data.levels.length + " quality levels");
            });
        });
        mainVideoControls_1.vidProgress.style.width = '0%';
        mainVideoControls_1.togglePlaying();
    };
    videoOptions.videoOptionTwo.onclick = function () {
        hls_1.attachMedia(mainVideoControls_1.video);
        hls_1.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls_1.loadSource("https://video-dev.github.io/streams/test_001/stream.m3u8");
            hls_1.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log("manifest loaded, found " + data.levels.length + " quality levels");
            });
        });
        mainVideoControls_1.vidProgress.style.width = '0%';
        mainVideoControls_1.togglePlaying();
    };
}
