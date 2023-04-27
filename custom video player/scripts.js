const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playButton= document.querySelector('.toggle');
const vol= document.querySelector('.vol');
const playback= document.querySelector('.speed');
const skipping= document.querySelectorAll('[data-skip]');
const prog= document.querySelector('.progress__filled');
const progressBar= document.querySelector('.progress');
// console.log(videoTime);


function handleProgress(){
    const percent= (video.currentTime / video.duration)*100;
    prog.style.flexBasis=`${percent}%`
}
function togglePlay(){
    if(video.paused) {
        video.play();
        playButton.innerHTML="&#10074&#10074";
    }
    else{
        video.pause();
        playButton.innerHTML="►";
    }
}
function handleVolume(){
    // console.log("before: "+video.volume);
    video.volume = this.value;
    // console.log("after: "+video.volume);
}
function handleSpeed(){
    // console.log("before: "+video.playbackRate);
    video.playbackRate = this.value;
    // console.log("after: "+video.playbackRate);
}
function handleScrub(e){
    const srubTime=(e.offsetX / progressBar.offsetWidth)*video.duration;
    video.currentTime=srubTime;
}
playButton.addEventListener('click',togglePlay);
vol.addEventListener('change',handleVolume);
vol.addEventListener('input',handleVolume);
playback.addEventListener('change',handleSpeed);
playback.addEventListener('input',handleSpeed);
skipping.forEach(button=>{
    button.addEventListener('click',()=>{ 
        // console.log(button.dataset.skip);
        video.currentTime += parseFloat(button.dataset.skip);
    })
});
video.addEventListener('timeupdate',handleProgress);
let mousedown=false;
progressBar.addEventListener('click',handleScrub);
progressBar.addEventListener('mousemove',(e)=> mousedown && handleScrub(e));
progressBar.addEventListener('mousedown',()=> mousedown=true);
progressBar.addEventListener('mouseup',() => mousedown=false);