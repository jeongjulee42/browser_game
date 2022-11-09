const timeClock = document.querySelector('.clock');
const playBtn = document.querySelector('button');
const playIcon = document.querySelector('.button__play')
const ground = document.querySelector('.ground');

let carrotNum = -1;

function leftTime(){
    let time = 10;
    timeClock.innerText = `0:${time}`;
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-stop');
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
        const carrot = document.createElement('img');
        carrot.setAttribute('src', "./imgs/carrot.png");
        // carrot.setAttribute('class', `${i}`);
        carrot.setAttribute('class', `carrot`);
        ground.appendChild(carrot);
        carrot.style.position = 'absolute';
        const coordinate = makeCoordinate();
        carrot.style.top = `${coordinate.top}%`;
        carrot.style.left = `${coordinate.left}%`;
    }
}
function makeBug(){
    for (let i = 0; i<10; i++){
        const bug = document.createElement('img');
        bug.setAttribute('src', "./imgs/bug.png");
        bug.setAttribute('class', `${i}`);
        bug.setAttribute('class', `bug`);
        ground.appendChild(bug);
        bug.style.position = 'absolute';
        const coordinate = makeCoordinate();
        bug.style.top = `${coordinate.top}%`;
        bug.style.left = `${coordinate.left}%`;
    }
}
function makeCoordinate(){
    let left = Math.floor(Math.random()*90) + 1
    let top = Math.floor(Math.random()*73) + 1
    return {left:left, top:top};
}

playBtn.addEventListener('click', () => {
    playBtn.setAttribute('class','stopBtn');
    carrotNum = 10;
    leftTime();
    makeCarrot();
    makeBug();
    const stopBtn = document.querySelector('.stopBtn');
    stopBtn.addEventListener('click', () => {

    })
})

ground.addEventListener('click', (event) => {
    if (event.target.className === 'carrot'){
        event.target.remove();
        carrotNum--;
        if (carrotNum === 0){
            console.log("win");
        }
    } else if (event.target.className === 'bug'){
        console.log('lose');
    }
})