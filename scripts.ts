if(Hls.isSupported()) {

  console.log('HLS Supported!')

  const video: HTMLVideoElement = document.querySelector('.video-main');
  const vidCurrentTime: HTMLParagraphElement = document.querySelector('.current-time');
  const vidProgress: HTMLParagraphElement = document.querySelector('.progress-fg');
  const seekBar: HTMLDivElement = document.querySelector('.progress-bg');
  const vidDuration: HTMLDivElement = document.querySelector('.duration');
  const playButton: HTMLButtonElement = document.querySelector('.play-btn');
  const playButtonIcon: HTMLImageElement = document.querySelector('.play-icon');
  

  const setTime = function(time: number): string {

    let minutes: number = Math.floor(time / 60)
    let seconds: string = (('0' + Math.floor(time - minutes * 60)).substr(-2))
    return `${minutes}:${seconds}`
  }

  playButton.onclick = function(): void {
    if(video.paused){
      video.play();
      playButtonIcon.setAttribute('src', './assets/pause.svg')
    } else {
      video.pause();
      playButtonIcon.setAttribute('src', './assets/play-sign.svg')
    }
  }

  video.ontimeupdate = function() {
    vidCurrentTime.innerText = setTime(video.currentTime)
    updateProgressBar()
  }

  video.onloadedmetadata = function () {
    vidDuration.innerText = setTime(video.duration)
  }

  const updateProgressBar = function(): void {
    vidProgress.style.width = (`${(video.currentTime / video.duration) * 100}%`)
  }

  seekBar.onclick = function(event) {
    let seekBarEnd: number = seekBar.getBoundingClientRect().right;
    let seekBarStart: number = seekBar.getBoundingClientRect().left;
    let clickLocation: number = event.clientX - seekBarStart;
    let seekBarLength = seekBarEnd - seekBarStart;
    video.currentTime = (clickLocation/seekBarLength) * video.duration;
    video.play()
  }



  let hls = new Hls();
  hls.attachMedia(video);
  hls.on(Hls.Events.MEDIA_ATTACHED, function() {
    hls.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8")
    hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
      console.log("manifest loaded, found " + data.levels.length + " quality level")
    })
  })
}
