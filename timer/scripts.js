let countdown;
const display= document.querySelector(".display__time-left");
const left= document.querySelector(".display__end-time");
const btns= document.querySelectorAll("[data-time]");
const inp= document.customForm;

function timer(seconds){
    clearInterval(countdown);
    const now= Date.now();
    const then= now + (seconds*1000);
    displayEnd(then);
    displayTimer(seconds);
    countdown = setInterval(()=>{
        const secondsLeft= Math.round((then - Date.now())/1000);
        if(secondsLeft<0){ clearInterval(countdown); return;}
        displayTimer(secondsLeft);
    },1000);
}

function displayTimer(seconds){
    const min=Math.floor(seconds/60);
    const sec= seconds%60;
    
 display.textContent= `${min}:${sec<10 ? "0": ""}${sec}`;
}


function displayEnd(timeStamp){

    const time= new Date(timeStamp);
    const hours=time.getHours();
    const minutes= time.getMinutes();

    left.textContent= `be back at ${hours > 12 ? hours-12 :hours}:${minutes <10 ? "0": ""}${minutes}`;

}

function startTimer(){
    const sec= parseInt(this.dataset.time);
    timer(sec);
}

btns.forEach(btn=> btn.addEventListener("click",startTimer));
inp.addEventListener("submit",function(e){
    e.preventDefault();
    const mins= this.minutes.value;
    timer(mins*60);
    console.log(mins);
});
