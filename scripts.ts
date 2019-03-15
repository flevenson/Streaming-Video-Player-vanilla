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

    togglePlaying(): void {
      if(this.video.paused){
        this.video.play();
        this.playButtonIcon.setAttribute('src', './assets/pause.svg')
      } else {
        this.video.pause();
        this.playButtonIcon.setAttribute('src', './assets/play-sign.svg')
      }
    }

    updateProgressBar(): void {
      this.vidProgress.style.width = (`${(this.video.currentTime / this.video.duration) * 100}%`)
    }

    seek(event): void {
      let seekBarEnd: number = this.seekBar.getBoundingClientRect().right;
      let seekBarStart: number = this.seekBar.getBoundingClientRect().left;
      let clickLocation: number = event.clientX - seekBarStart;
      let seekBarLength = seekBarEnd - seekBarStart;
      this.video.currentTime = (clickLocation/seekBarLength) * this.video.duration;
      this.video.play()
      this.playButtonIcon.setAttribute('src', './assets/pause.svg')
    }
  }

  
  class TimeSettings {
    
    setTime(time: number): string {
      let minutes: number = Math.floor(time / 60)
      let seconds: string = (('0' + Math.floor(time - minutes * 60)).substr(-2))
      return `${minutes}:${seconds}`
    }

  }

  class VideoOptions {
    videoOptionOne: HTMLDivElement = document.querySelector('.video-option-1')
    videoOptionTwo: HTMLDivElement = document.querySelector('.video-option-2')


  }

  let mainVideoControls = new MainVideoControls
  let timeSettings = new TimeSettings
  let videoOptions = new VideoOptions

  mainVideoControls.playButton.onclick = function(): void {
    mainVideoControls.togglePlaying()
  }

  mainVideoControls.video.ontimeupdate = function() {
    mainVideoControls.vidCurrentTime.innerText = timeSettings.setTime(mainVideoControls.video.currentTime)
    mainVideoControls.updateProgressBar()
  }

  mainVideoControls.video.onloadedmetadata = function () {
    mainVideoControls.vidDuration.innerText = timeSettings.setTime(mainVideoControls.video.duration)
  }

  mainVideoControls.seekBar.onclick = function(event) {
    mainVideoControls.seek(event)
  }

  let hls = new Hls();

  videoOptions.videoOptionOne.onclick = function() {
    hls.attachMedia(mainVideoControls.video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function() {
      hls.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8")
      hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
        console.log("manifest loaded, found " + data.levels.length + " quality levels")
      })
    })
    mainVideoControls.vidProgress.style.width = '0%'
    mainVideoControls.togglePlaying()
  }

  videoOptions.videoOptionTwo.onclick = function() {
    hls.attachMedia(mainVideoControls.video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function() {
      hls.loadSource("https://video-dev.github.io/streams/test_001/stream.m3u8")
      hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
        console.log("manifest loaded, found " + data.levels.length + " quality levels")
      })
    })
    mainVideoControls.vidProgress.style.width = '0%'
    mainVideoControls.togglePlaying()
  }
}
