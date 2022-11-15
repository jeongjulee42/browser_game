import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win:'win',
    lose:"lose",
    cancel:'cancel',
});

export class GameBuilder {
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }

    withBugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        console.log(this);
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);    
        this.gameBtn.addEventListener('click', () => {
            if(this.started){
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });
    }
    onItemClick = (item) => {
        if (!this.started){
            return;
        }
        if (item === 'carrot'){
            this.score ++;
            this.updateSocreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        } else if (item === 'bug'){
            this.stop(Reason.lose);
        }
    }
    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }
    start(){
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    };
    stop(reason){
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    };


    updateSocreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
    
    
    hideGameButton(){ // o
        this.gameBtn.style.visibility = 'hidden';
    }
    
    stopGameTimer(){ // o
        clearInterval(this.timer);
    }
    
    startGameTimer(){ // o
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if(remainingTimeSec <= 0){
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score? Reason.win : Reason.lose)
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    updateTimerText(time){ // o
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
    showStopButton(){ // o
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    showTimerAndScore(){ // o
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    initGame(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    
    }
}