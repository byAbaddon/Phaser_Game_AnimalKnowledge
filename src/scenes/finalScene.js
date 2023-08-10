import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'
import { GameScene } from "/src/scenes/gameScene";

export class FinalScene extends Scene {
  constructor() {
    super('FinalScene')
  }


  init() {
    console.log('FinalScene was loading...');
    this.game.sound.stopAll()  //stop all sounds
    this.cameras.main.setBackgroundColor('#000000')   
  }

  preload() {
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    fnc.checkOrientation(this)
    // LOAD IMAGE
    this.load.atlas('flares', '/assets/images/particles/flares.png', '/assets/images/particles/flares.json');
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    //cup   
    this.load.image('goldCup', '/assets/images/cup/goldCup.png')
    //confetti
    this.load.image('red','../assets/images/confetti/red.png')
    this.load.image('green','../assets/images/confetti/green.png')
    this.load.image('blue','../assets/images/confetti/blue.png')
    this.load.image('white','../assets/images/confetti/white.png')
    
    //LOAD AUDIO
    //bg
    this.load.audio('bgFinal', '../assets/sounds/background/bgFinal.mp3')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
  }

  create() {
    // ADD IMAGE
    this.add.image(10, 199, 'goldCup').setOrigin(0.0).setScale(0.7)
     //---btn exit
     this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)
    //ADD AUDIO
     fnc.createAudio(this, 'bgFinal', 0.3).play()
   
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    //ADD TEXT
    fnc.createText(this, 24, 100, 'CONGRATULATIONS', 46).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    fnc.createText(this, 10, cfg.height - 200, 'You are a very good player!', 32)
    fnc.createText(this, 20, cfg.height - 160, 'Try again, to improve your\n\t\t knowledge, even more.', 32)
    fnc.createText(this, 100, cfg.height - 70, 'Good Luck', 46).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    

    this.btnExit.setInteractive({ cursor: 'pointer' })
      .on('pointerover', () => this.btnExit.setTint(0xc0c0c0))
      .on('pointerout', () => this.btnExit.setTint(0xffffff))
      .on('pointerdown', () => {
        this.scene.start('IntroScene')
        //play sound
        this.soundBtnExitClick()
        // this.game.sound.stopAll()  //stop all sounds
        this.sound.removeAll() //remove all sounds
        
        // Remove GameScene to fix problem
        this.scene.remove('GameScene')
        //Add again GameScene
        this.scene.add('GameScene', GameScene,);  
  })


    
    // --------------------------------------------------- particle
    // Set emitter properties
    this.emitterOne = this.add.particles(100, 0, 'green', {
      x: 100,
      y: 30,
      frame: [],

      scale: { min: 0.25, max: 1 },
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
      lifespan: 3000,
      frequency: 100,
      blendMode: 'ADD',
      gravityY: 110,
    });
    
  
    this.emitterTwo = this.add.particles(100, 0,'red', {
      x: 100,
      y: 30,
      scale: { min: 0.25, max: 1 },
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
      lifespan: 3000,
      frequency: 100,
      blendMode: 'ADD',
      gravityY: 110,
    });
  
  

    this.ballEmitter = this.add.particles(220, 40, 'flares', {
      frame: ['red', 'yellow', 'green', 'blue', 'white' ],
        lifespan: 3000,
        speed: { min: 150, max: 250 },
        scale: { start: 0.5, end: 0 },
        gravityY: 150,
        bounce: 0.8,
        blendMode: 'ADD'
    });

    
  // Stop the emitter after 2 seconds
    this.time.delayedCall(30000, () => {
      this.emitterOne.stop()
      this.emitterTwo.stop()
      this.ballEmitter.stop() 
    });

  }
}

