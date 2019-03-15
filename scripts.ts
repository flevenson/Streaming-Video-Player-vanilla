if(Hls.isSupported()) {

  console.log('HLS Supported!')
  
  class MainVideoControls {
  video: HTMLVideoElement = document.querySelector('.video-main');
  vidCurrentTime: HTMLParagraphElement = document.querySelector('.current-time');
  vidProgress: HTMLParagraphElement = document.querySelector('.progress-fg');
  seekBar: HTMLDivElement = document.querySelector('.progress-bg');
  vidDuration: HTMLDivElement = document.querySelector('.duration');
  playButton: HTMLButtonElement = document.querySelector('.play-btn');
  playButtonIcon: HTMLImageElement = document.querySelector('.play-icon');

  constructor(){  }
  }

  let mainVideoControls = new MainVideoControls

  const setTime = function(time: number): string {

    let minutes: number = Math.floor(time / 60)
    let seconds: string = (('0' + Math.floor(time - minutes * 60)).substr(-2))
    return `${minutes}:${seconds}`
  }

  mainVideoControls.playButton.onclick = function(): void {
    if(mainVideoControls.video.paused){
      mainVideoControls.video.play();
      mainVideoControls.playButtonIcon.setAttribute('src', './assets/pause.svg')
    } else {
      mainVideoControls.video.pause();
      mainVideoControls.playButtonIcon.setAttribute('src', './assets/play-sign.svg')
    }
  }

  mainVideoControls.video.ontimeupdate = function() {
    mainVideoControls.vidCurrentTime.innerText = setTime(mainVideoControls.video.currentTime)
    updateProgressBar()
  }

  mainVideoControls.video.onloadedmetadata = function () {
    mainVideoControls.vidDuration.innerText = setTime(mainVideoControls.video.duration)
  }

  const updateProgressBar = function(): void {
    mainVideoControls.vidProgress.style.width = (`${(mainVideoControls.video.currentTime / mainVideoControls.video.duration) * 100}%`)
  }

  mainVideoControls.seekBar.onclick = function(event) {
    let seekBarEnd: number = mainVideoControls.seekBar.getBoundingClientRect().right;
    let seekBarStart: number = mainVideoControls.seekBar.getBoundingClientRect().left;
    let clickLocation: number = event.clientX - seekBarStart;
    let seekBarLength = seekBarEnd - seekBarStart;
    mainVideoControls.video.currentTime = (clickLocation/seekBarLength) * mainVideoControls.video.duration;
    mainVideoControls.video.play()
  }



  let hls = new Hls();
  hls.attachMedia(mainVideoControls.video);
  hls.on(Hls.Events.MEDIA_ATTACHED, function() {
    hls.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8")
    hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
      console.log("manifest loaded, found " + data.levels.length + " quality level")
    })
  })
}
