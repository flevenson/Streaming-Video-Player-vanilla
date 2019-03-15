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
        };
        MainVideoControls.prototype.seek = function (event) {
            console.log(event.type);
            var seekBarEnd = this.seekBar.getBoundingClientRect().right;
            var seekBarStart = this.seekBar.getBoundingClientRect().left;
            var clickLocation = event.clientX - seekBarStart;
            var seekBarLength = seekBarEnd - seekBarStart;
            this.video.currentTime = (clickLocation / seekBarLength) * this.video.duration;
            this.video.play();
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
    var mainVideoControls_1 = new MainVideoControls;
    var timeSettings_1 = new TimeSettings;
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
    var hls_1 = new Hls();
    hls_1.attachMedia(mainVideoControls_1.video);
    hls_1.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls_1.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8");
        hls_1.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
        });
    });
}
