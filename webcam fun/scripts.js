const video= document.querySelector('.player');
const canvas= document.querySelector('.photo');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
    .then(mediaStream=>{
        video.srcObject =mediaStream;
        video.play();
    })
    .catch(err=>{
        console.log("error is "+err);
    });
}
}
function drawOnCanvas()
{
    video.addEventListener( "loadedmetadata", function () {
        // retrieve dimensions
        const height = this.videoHeight;
        const width = this.videoWidth;
    
        // send back result
        console.log(height, width);
        
        canvas.width = width;
        canvas.height = height;
    }, false);
setInterval(()=>{
ctx.drawImage(video,0,0,canvas.width,canvas.height);
let pixels= ctx.getImageData(0,0,canvas.width,canvas.height);
pixels= greenScreen(pixels);
// ctx.globalAlpha=0.1;
ctx.putImageData(pixels,0,0);
},16);
}
function redPixel(pixels){
    for(i=0;i<pixels.data.length;i+=4){
        pixels.data[i+0]=pixels.data[i+0]+100;
        pixels.data[i+1]=pixels.data[i+1]-50;
        pixels.data[i+2]=pixels.data[i+2]*0.5;
    }
    return pixels;
}
function takePhoto(){
    snap.currentTime=0;
    snap.play();

    const data= canvas.toDataURL('image/jpeg');
    const link=document.createElement('a');
    link.href=data;
    link.setAttribute('download','picture');
    link.innerHTML= `<img src="${data}" alt="photo of you"/>`;
    strip.insertBefore(link,strip.firstChild);

}
function greenScreen(pixels){
    const levels={};
    
    document.querySelectorAll('.rgb input').forEach((input)=>{
        levels[input.name]=input.value;
    });

    for(i=0 ;i<pixels.data.length;i+=4){
        red=pixels.data[i+0];
        green=pixels.data[i+1];
        blue=pixels.data[i+2];

        if(red<=levels.rmin && 
            green<= levels.gmin && 
            blue <=levels.bmin && 
            red>=levels.rmax && 
            green>= levels.gmax && 
            blue>= levels.bmax){
            pixels.data[i+3]=0;
        }
    }
    return pixels;
}
getVideo();
video.addEventListener('canplay', drawOnCanvas);
