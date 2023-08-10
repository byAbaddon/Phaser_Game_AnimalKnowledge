import {Scene} from'phaser';
import * as fnc from '../game.js';
import {cfg} from '../game.js'

export class CreditsScene extends Scene {
  constructor() {
    super('CreditsScene')
  }
  init() {
    console.log('CreditsScene was loading...')
  }

  preload() {
    //---------------load IMAGES
    this.load.image('logoPhaser', '/assets/images/logo/phaser.png')
     //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    
    //---------------load AUDIO
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
     
  }


  create() {
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    fnc.checkOrientation(this)
    //------------------------------- add AUDIO
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    
    //------------------------------- add IMAGE
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35 , 37, 'btnExit').setScale(0.5)
     //------middle-----logo
    this.add.image(cfg.width - 210, cfg.height - 200, 'logoPhaser').setScale(0.4) 
    
    //------------------------------ add TEXT

    //top
    fnc.createText(this, 10,  10, 'Version: 1.0.0-beta', 16,'white')
    fnc.createText(this, cfg.width / 2 - 90,  110, 'CREDITS', 48,'white')
    .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    //--------top left
    //free img
    fnc.createText(this, 20, cfg.height / 5 + 20, 'Free Images:', 35,'brown')
    fnc.createText(this, 40, cfg.height / 4 + 5, 'https://playgroundai.com/', 25, 'teal',)
    fnc.createText(this, 40, cfg.height / 4 + 30, 'https://www.pngwing.com', 25,'teal' , )
    fnc.createText(this, 40, cfg.height / 4 + 55, 'https://www.freepik.com', 25,'teal' , )
    fnc.createText(this, 40, cfg.height / 4 + 80, 'https://www.craftpix.net', 25, 'teal',)
    
    //free sounds
    fnc.createText(this, 20, cfg.height / 3 + 40, 'Free Sounds:', 35,'brown' , )
    fnc.createText(this, 40, cfg.height / 3 + 70, 'https://www.freesound.org', 25,'teal' , )
    fnc.createText(this, 40, cfg.height / 3 + 95, 'https://pixabay.com/bg/music/', 25,'teal' , )
    fnc.createText(this, 40, cfg.height / 3 + 120, 'https://orangefreesounds.com', 25,'teal' , )
    
     //free text
    fnc.createText(this, 20, cfg.height / 2 , 'Free Text:', 35, 'brown',)
    fnc.createText(this, 40, cfg.height / 2 + 30, 'https://www.dafont.com', 25,'teal' , )

    //platform
    fnc.createText(this, 20, cfg.height / 2 + 80, 'Platform 2D game:', 35,'brown' , )
    fnc.createText(this, 40, cfg.height / 2 + 120, 'https://phaser.io/', 25,'teal' , )

   
    //---------- bottom
    fnc.createText(this, 20, cfg.height - 55, 'Developer:', 20,'brown' , )
    fnc.createText(this, 40, cfg.height - 35, 'By Abaddon', 20, '#BEDDDD')
    
    fnc.createText(this, cfg.width / 2 - 70, cfg.height - 55, 'Bug rapports:', 20, 'brown')
    fnc.createText(this, cfg.width / 2 - 40, cfg.height - 35, 'subtotal@avb.bg', 20, '#BEDDDD')

    fnc.createText(this, cfg.width - 120, cfg.height - 55, 'Copyright:', 20,'brown' , )
    fnc.createText(this, cfg.width - 60, cfg.height - 35, '2023', 20, '#BEDDDD' )


    this.btnExit.setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => this.btnExit.setTint(0xe0e0e0))
        .on('pointerout', () =>  this.btnExit.setTint(0xffffff)) 
        .on('pointerdown', (index) => {
          const currentScene = this.scene.scene;
          this.scene.stop(currentScene);

          this.scene.start('MenuScene') //switch Scene
          this.soundBtnExitClick()  // play sound
    })
  }


  update() {}
} 