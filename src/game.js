import style from "./main.css";
import Phaser, { Game } from 'phaser';
import loadMultiImages from "./functions/loadMultiImages";
import createAudio from "./functions/createAudio";
import createText from "./functions/createText";
import createAnimation from "./functions/createAnimation";
import checkOrientation from "./functions/checkOrientation";
import * as tweenAnimation from "./functions/createTween";

import { IntroScene } from "./scenes/introScene";
import { MenuScene } from "./scenes/menuScene";
import { LearnScene } from "./scenes/learnScene";
import { GameScene } from "./scenes/gameScene";
import { CreditsScene } from "./scenes/creditsScene";
import { FinalScene } from "./scenes/finalScene";
import { GameOverScene } from "./scenes/gameOverScene";


const cfg = {
  width: 440,  //440
  height: 950, //950
  orientation: 'portrait', // set phone orientation  (portrait - vertical, landscape - horizontal)
  forceOrientation: true,
  backgroundColor: 'rgb(10, 40, 10)', //'rgb(0,0,100)'
  type: Phaser.AUTO,
  // type: Phaser.CANVAS,
  parent: 'game',
  scene: [IntroScene,MenuScene, LearnScene, GameScene, CreditsScene,FinalScene, GameOverScene, ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, //false default
      gravity: { y: 0 }, // default gravity
    }
  },
  scale: {
    mode: Phaser.Scale.SHOW_ALL,
    // mode: Phaser.Scale.FIT,
    // mode: Phaser.Scale.PORTRAIT, // vertical orientation screen
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH
   
  },
  dom: {
    createContainer: true
  },
  global: {
    currentAnimalIndex: 0, // Initial value of the global property 
    globalDataJSON: null, // Set initial JSON value to null
    globalImages : null
  }
};

const game = new Phaser.Game(cfg)


// Once the game starts, load the JSON data and assign it to the globalDataJSON property
game.events.once('start', () => {
  game.scene.getScene('IntroScene').scene.launch(); 

});




export {
  cfg,
  loadMultiImages,
  createAudio,
  createAnimation,
  createText,
  tweenAnimation,
  checkOrientation,
}

