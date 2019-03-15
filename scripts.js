if (Hls.isSupported()) {
    console.log('HLS Supported!');
    var video_1 = document.querySelector('.video-main');
    var vidCurrentTime_1 = document.querySelector('.current-time');
    var vidProgress_1 = document.querySelector('.progress-fg');
    var seekBar_1 = document.querySelector('.progress-bg');
    var vidDuration_1 = document.querySelector('.duration');
    var playButton = document.querySelector('.play-btn');
    var playButtonIcon_1 = document.querySelector('.play-icon');
    var setTime_1 = function (time) {
        var minutes = Math.floor(time / 60);
        var seconds = (('0' + Math.floor(time - minutes * 60)).substr(-2));
        return minutes + ":" + seconds;
    };
    playButton.onclick = function () {
        if (video_1.paused) {
            video_1.play();
            playButtonIcon_1.setAttribute('src', './assets/pause.svg');
        }
        else {
            video_1.pause();
            playButtonIcon_1.setAttribute('src', './assets/play-sign.svg');
        }
    };
    video_1.ontimeupdate = function () {
        vidCurrentTime_1.innerText = setTime_1(video_1.currentTime);
        updateProgressBar_1();
    };
    video_1.onloadedmetadata = function () {
        vidDuration_1.innerText = setTime_1(video_1.duration);
    };
    var updateProgressBar_1 = function () {
        vidProgress_1.style.width = ((video_1.currentTime / video_1.duration) * 100 + "%");
    };
    seekBar_1.onclick = function (event) {
        var seekBarEnd = seekBar_1.getBoundingClientRect().right;
        var seekBarStart = seekBar_1.getBoundingClientRect().left;
        var clickLocation = event.clientX - seekBarStart;
        var seekBarLength = seekBarEnd - seekBarStart;
        video_1.currentTime = (clickLocation / seekBarLength) * video_1.duration;
        video_1.play();
    };
    var hls_1 = new Hls();
    hls_1.attachMedia(video_1);
    hls_1.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls_1.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8");
        hls_1.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
        });
    });
}
