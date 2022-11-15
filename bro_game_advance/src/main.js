'use strict'
import PopUp from './popup.js';
import GameBuilder from './game.js';


const gameFinishBanner = new PopUp();
const game = new GameBuilder().withGameDuration(60).withCarrotCount(15).withBugCount(10).build();

game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case 'cancel':
            message = 'REPLAY?';
            break;
        case 'win':
            message = 'You won';
            break;
        case 'lose':
            message = 'You lost';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});






