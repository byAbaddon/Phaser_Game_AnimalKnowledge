import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'

let loadingSceneStarted = false; 
export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
  }
  init() {
    console.log('IntroScene was loading...')  
  }

  preload() {
    //============================(((LOAD GLOBAL DATA)))================================

    //============ LOAD JSON VARIABLE DATA TO STORE FOR GLOBAL USE ALL SCENES ==========
    //----load json animal DATA 
    this.load.json('data', '/assets/images/animals.json');

    // Listen for the JSON loading completion event
    this.load.on('complete', () => {
    // Access the loaded JSON data and save to cfg.global.globalDataJSON
      cfg.global.globalDataJSON = this.cache.json.get('data');
    })
    
    //--- LOAD AUDIO FORM JSON  multi files data and Extract the enName and sound path
    this.load.once('complete', () => {
      cfg.global.globalDataJSON.forEach(x => this.load.audio(`${x.enName}`, `${x.sound}`))
      // Start loading audio assets
      this.load.start();
     })
  
    //===========================END LOAD JSON==========================
    //-------------load global images
    this.load.image('phoneImage' , "/assets/images/phone/horizontalPhoneText.png")
    cfg.global.globalImages =  ['phoneImage']


     //============================(((END LOAD GLOBAL DATA)))================================


    //------------------------------LOAD AUDIO
    this.load.audio('bgIntro', '/assets/sounds/background/bgIntro.mp3')
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
    
    //------------------------------- LOAD IMAGES
    //---logo
    this.load.image('logo', '/assets/images/logo/1.png')
    //button start
    this.load.spritesheet('btnControls', '/assets/images/buttons/longBtn.png',
      { frameWidth: 500, frameHeight: 194, startFrame: 1, endFrame: 0 });
     
  }
 

  create() {
     //-------------------------------watcher CHECK ORIENTATION PHONE 
     fnc.checkOrientation(this)
    //----------------audio
    this.soundBgIntro = fnc.createAudio(this, 'bgIntro', 0.5, true)
    // check is bg music not play, start music
    if (!this.sound.getAllPlaying().length) this.soundBgIntro.play()
      

    this.soundBtnStartClick = () => fnc.createAudio(this,'btnStartClick').play()
    //-------------------------------add IMAGES
    //---logo
   const logo = this.add.image(46, 230,'logo').setOrigin(0, 0).setScale(0.9)
    


    //-------------------------------add TEXT
    //---logo
    const titleText = fnc.createText(this, 30, 100, 'Animals Knowledge','40px')

    //---start game label
    const subTitleText = fnc.createText(this, 20, cfg.height - 250, 'Press button to Menu options','28px')
 
    // ------------------------------buttons
    this.btnStart = this.add.image(cfg.width / 2, cfg.height - 150, 'btnControls').setScale(0.4, 0.5)
    //---start btn label
    fnc.createText(this, cfg.width / 2 - 30, cfg.height - 174, 'MENU','28px',null,null,'bold')
    
  
    this.btnStart.setInteractive({ cursor: 'pointer'})                      //    write direct css command  in   setInteractive()
    .on('pointerover', () => this.btnStart.setTint(0xe0e0e0))
    .on('pointerout',  () =>  this.btnStart.setTint(0xffffff))
    .on('pointerdown', () => {
      this.scene.start('MenuScene')
        //play sound
      this.soundBtnStartClick()
      })

   
    //-------------------------------Tween Animations
    // fnc.tweenAnimation.createRotateAnimation(this, logo)
    // fnc.tweenAnimation.createTextChangeColorAnimation(this,titleText)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, subTitleText, 40)

  }

  update() {
  
  }


}
