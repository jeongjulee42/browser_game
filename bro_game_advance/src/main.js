'use strict'
import PopUp from './popup.js';
import * as sound from './sound.js';
import {Reason, GameBuilder} from './game.js';


const gameFinishBanner = new PopUp();
const game = new GameBuilder().withGameDuration(60).withCarrotCount(15).withBugCount(10).build();

game.setGameStopListener((reason) => {
    let message;
    switch(reason) {
        case Reason.cancel:
            message = 'REPLAY?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You won';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You lost';
            sound.playBug();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});






