const timeClock = document.querySelector('.clock');
const playBtn = document.querySelector('button');
const ground = document.querySelector('.ground');

function leftTime(){
    let time = 10;
    timeClock.innerText = `0:${time}`;
    const interval = setInterval(()=> {
        time--;
        timeClock.innerText = `0:${time}`;
        if (time === 0){
            clearInterval(interval);
        }
    }, 1000);
}
function makeCarrot(){
    for (let i = 0; i<10; i++){
        ground.appendChild
    }
}
function makeCoordinate(){
    let left = Math.floor(Math.random()*99) + 1
    let top = Math.floor(Math.random()*99) + 1
    return {left:left, top:top};

}

playBtn.addEventListener('click', () => {
    leftTime();
    makeCarrot();
})