import {Scene} from'phaser';
import * as fnc from '../game.js';
import {cfg} from '../game.js'

export class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }
  init() {
    console.log('MenuScene was loading...')  
  }
  preload() {
    //------------------------------load AUDIO
    this.load.audio('btnClick', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
   
    
    //-------------------------------load IMAGES
    //---panda
    this.load.image('panda1', '/assets/images/panda/1.png')
    this.load.image('panda2', '/assets/images/panda/2.png')
    this.load.image('panda3', '/assets/images/panda/3.png')
    this.load.image('panda4', '/assets/images/panda/4.png')
    //buttons Sprite
    this.load.spritesheet('allButtons', '/assets/images/buttons/longBtn.png', { frameWidth: 500, frameHeight: 194, })
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
  
  }
 
  create() {
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    fnc.checkOrientation(this)
    //-------------------------------add AUDIO
    //---bg if music not play, start
    if (!this.sound.get('bgIntro').isPlaying) this.sound.get('bgIntro').play()


    this.soundBtnClick = () => fnc.createAudio(this,'btnClick').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    
    //-------------------------------add TEXT
    //---title
    const titleText = fnc.createText(this, 24, 70, 'Make You Choice...', '46px')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    //---start game label
    const creditsText = fnc.createText(this, 30, 260 - 20, 'Press button to show credits', '28px')
      // .setShadow(1, 1, "#FFA500", 1, true, true)
    const learnGameText = fnc.createText(this, 30, cfg.height / 2 - 85, 'Press button to star learn', '28px')
      // .setShadow(1, 1, "#FFA500", 1, true, true)
    const startGameText = fnc.createText(this, 20, cfg.height / 2 + 70, 'Press button to start game', '28px')
       .setShadow(1, 1, "#000100", 1, true, true)
    

    //-------------------------------add IMAGES
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)
    

  

    //-----------buttons from sprite
    //---btn credits
    this.btnCredits = this.add.sprite(cfg.width / 2, 200, 'allButtons', 0).setScale(0.4, 0.5)
    //-credits label
    fnc.createText(this, cfg.width / 2 - 60, 176, 'CREDITS','28px',null,null,'bold',)

    //---btn start Learn
    this.btnLearn = this.add.sprite(cfg.width / 2 - 4, 340, 'allButtons', 2).setScale(0.4, 0.5)
    //---learn label
    fnc.createText(this, cfg.width / 2 - 50, 330, 'LEARN','28px',null,null,'bold',)


    //---btn start Play Game
    this.btnPlayGame = this.add.sprite(cfg.width / 2 - 10, cfg.height / 2 + 10, 'allButtons', 5).setScale(0.4, 0.5)
    //-play label
    fnc.createText(this, cfg.width / 2 - 40, cfg.height / 2 + 10, 'PLAY','28px',null,null,'bold',)
    //--------panda
    this.panda = this.add.image(cfg.width / 2 , cfg.height - 180, 'panda1').setScale(0.9)
    
    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnCredits, this.btnLearn, this.btnPlayGame, ])
      .forEach((btn, index) => { btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xc0c0c0))
        .on('pointerout', () =>  btn.setTint(0xffffff)) 
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          const currentScene = this.scene.scene;
          this.scene.stop(currentScene);

          if(index == 0) this.scene.start('IntroScene')
          if(index == 1) this.scene.start('CreditsScene')
          if(index == 2) this.scene.start('LearnScene')
          if(index == 3) this.scene.start('GameScene')
           // play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else  this.soundBtnClick()

         }) 
       })

    //-------------------------------Animation
    this.anims.create({ 
      key: 'pandaAnimation',
      frames: [
          { key: 'panda1', duration: 0},
          { key: 'panda2', duration: 0},
          { key: 'panda3', duration: 0},
          { key: 'panda4', duration: 10},
          { key: 'panda1', duration: 0},
      ],
      delay: 500,
      frameRate: 4, 
      repeat: -1,
      repeatDelay: Phaser.Math.Between(1000, 3000)
      
    })

    this.add.sprite(cfg.width / 2 , cfg.height - 180, 'panda1').setScale(0.9).play('pandaAnimation')    // извиква анимацията
 

    //-------------------------------Tween Animations

    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, creditsText, 40,250)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, learnGameText, 54,100)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, startGameText)
   
    
  }

  update() {
   
  }

}