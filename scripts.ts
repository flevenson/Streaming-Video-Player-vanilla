class MainVideoControls {
  
  constructor(
    public video: HTMLVideoElement,
    public vidCurrentTime: HTMLParagraphElement,
    public vidProgress: HTMLParagraphElement,
    public seekBar: HTMLDivElement,
    public vidDuration: HTMLDivElement,
    public playButton: HTMLButtonElement,
    public playButtonIcon: HTMLImageElement,
    public draggableCircle: HTMLImageElement,
    public isDragging: boolean) {
      this.video = video;
      this.vidCurrentTime = vidCurrentTime;
      this.vidProgress = vidProgress;
      this.seekBar = seekBar;
      this.vidDuration = vidDuration;
      this.playButton = playButton;
      this.playButtonIcon = playButtonIcon;
      this.draggableCircle = draggableCircle;
      this.isDragging = isDragging
    }
    
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
    if(!this.isDragging){
      this.draggableCircle.style.left = (`${this.vidProgress.getBoundingClientRect().right - 55}px`)
    }
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
    
  makeBallDraggable(elem): void {

    let boundThis = this
    elem.onmousedown = dragMouseDown;
    let positionOne: number = 0;
    let positionTwo: number = 0;

    function dragMouseDown(e) {
      boundThis.isDragging = true
      e = e || window.event
      e.preventDefault();
      positionTwo = e.clientX;
      document.onmousemove = drag;
      document.onmouseup = stopDragging;
    }
      
    function drag(e): void {
      e = e || window.event
      e.preventDefault();
      positionOne = positionTwo - e.clientX;
      positionTwo = e.clientX;
      elem.style.left = `${(elem.offsetLeft - positionOne)}px`;
    }
      
    function stopDragging(): void {
      boundThis.isDragging = false
      document.onmouseup = null;
      document.onmousedown = null;
      document.onmousemove = null;
    }
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
  
  constructor(public videoOptionOne: HTMLDivElement, public videoOptionTwo: HTMLDivElement){
    this.videoOptionOne = videoOptionOne;
    this.videoOptionTwo = videoOptionTwo;
  }
}
  
const mainVideoControls = new MainVideoControls(
  document.querySelector('.video-main'),
  document.querySelector('.current-time'),
  document.querySelector('.progress-fg'),
  document.querySelector('.progress-bg'),
  document.querySelector('.duration'),
  document.querySelector('.play-btn'),
  document.querySelector('.play-icon'),
  document.querySelector('.draggable-circle'),
  false
)
const timeSettings = new TimeSettings
const videoOptions = new VideoOptions(document.querySelector('.video-option-1'), document.querySelector('.video-option-2'))
    
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
    
mainVideoControls.makeBallDraggable(mainVideoControls.draggableCircle)

if(Hls.isSupported()) {  
    
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