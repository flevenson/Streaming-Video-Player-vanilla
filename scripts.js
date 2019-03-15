if (Hls.isSupported()) {
    console.log('HLS Supported!');
    var MainVideoControls = /** @class */ (function () {
        function MainVideoControls() {
            this.video = document.querySelector('.video-main');
            this.vidCurrentTime = document.querySelector('.current-time');
            this.vidProgress = document.querySelector('.progress-fg');
            this.seekBar = document.querySelector('.progress-bg');
            this.vidDuration = document.querySelector('.duration');
            this.playButton = document.querySelector('.play-btn');
            this.playButtonIcon = document.querySelector('.play-icon');
        }
        return MainVideoControls;
    }());
    var mainVideoControls_1 = new MainVideoControls;
    var setTime_1 = function (time) {
        var minutes = Math.floor(time / 60);
        var seconds = (('0' + Math.floor(time - minutes * 60)).substr(-2));
        return minutes + ":" + seconds;
    };
    mainVideoControls_1.playButton.onclick = function () {
        if (mainVideoControls_1.video.paused) {
            mainVideoControls_1.video.play();
            mainVideoControls_1.playButtonIcon.setAttribute('src', './assets/pause.svg');
        }
        else {
            mainVideoControls_1.video.pause();
            mainVideoControls_1.playButtonIcon.setAttribute('src', './assets/play-sign.svg');
        }
    };
    mainVideoControls_1.video.ontimeupdate = function () {
        mainVideoControls_1.vidCurrentTime.innerText = setTime_1(mainVideoControls_1.video.currentTime);
        updateProgressBar_1();
    };
    mainVideoControls_1.video.onloadedmetadata = function () {
        mainVideoControls_1.vidDuration.innerText = setTime_1(mainVideoControls_1.video.duration);
    };
    var updateProgressBar_1 = function () {
        mainVideoControls_1.vidProgress.style.width = ((mainVideoControls_1.video.currentTime / mainVideoControls_1.video.duration) * 100 + "%");
    };
    mainVideoControls_1.seekBar.onclick = function (event) {
        var seekBarEnd = mainVideoControls_1.seekBar.getBoundingClientRect().right;
        var seekBarStart = mainVideoControls_1.seekBar.getBoundingClientRect().left;
        var clickLocation = event.clientX - seekBarStart;
        var seekBarLength = seekBarEnd - seekBarStart;
        mainVideoControls_1.video.currentTime = (clickLocation / seekBarLength) * mainVideoControls_1.video.duration;
        mainVideoControls_1.video.play();
    };
    var hls_1 = new Hls();
    hls_1.attachMedia(mainVideoControls_1.video);
    hls_1.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls_1.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8");
        hls_1.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
        });
    });
}
