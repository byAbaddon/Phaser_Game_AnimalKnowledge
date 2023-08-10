import {Scene} from 'phaser'
import * as fnc from '../game.js';
import {cfg} from '../game.js'

export class LearnScene extends Scene {
  constructor() {
    super('LearnScene');
    this.currentSound = null
  }

  init() {
    console.log('Welcome to LearnScene Learn...');
    this.game.sound.stopAll()  //stop all sounds
    this.counter = 0   
  }

  preload() {
    //----------------json DATA
    this.dataJSON = this.load.json('data', '/assets/images/animals.json')

    //------------------------------load AUDIO
    this.load.audio('bgLearn', '/assets/sounds/background/bgLearn.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')

    //--- load multi audio files form JSON data and Extract the enName and sound path
    this.load.once('complete', () => {
      this.cache.json.get('data').forEach(x => {
        this.load.audio(`${x.enName}`, `${x.sound}`)
      })
      // Start loading audio assets
      // this.load.start();
     })
     

    //-----------------------------load IMAGES
    //---arrows
    this.load.image('arrowRed', '/assets/images/arrows/red.png')
    this.load.image('arrowWhite', '/assets/images/arrows/white.png')
    //---language stickers
    this.load.image('bg', '/assets/images/flags/bg.png')
    this.load.image('ru', '/assets/images/flags/ru.png')
    this.load.image('gb', '/assets/images/flags/gb.png')

    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')

  }

  create() {
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    fnc.checkOrientation(this)
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    fnc.checkOrientation(this)
    //--------------------------------------- add DATA
    this.animalsDataArray = this.cache.json.get('data')
    const startAnimal = this.animalsDataArray[cfg.global.currentAnimalIndex]
 
    //frame
    this.frame = this.add.graphics().lineStyle(3, 0xffffff).strokeRect(8, 140, 423, 361);
    
    //text before load
    let load =fnc.createText(this, cfg.width / 2 - 140, cfg.height / 2 - 200,'Loading...', 60, 'white', null, 'bold')
    fnc.tweenAnimation.createTextChangeColorAnimation(this, load)

    //tween
      this.createTween = () => {
       return this.tweens.addCounter({
         target: this.frame,
         repeat: 0,
         duration: 300,
         onUpdate: (tween) => {
          const rand = Phaser.Math.Between(0, 2)
          const rgb = [0x00ff00, 0xff0000, 0x0000ff]
          // console.log(rgb[rand]);
          this.frame.clear() // Clear the current graphics object
          this.frame.lineStyle(3, rgb[rand]) // Create a new line with the new color
          this.frame.strokeRect(8, 140, 423, 361)// Draw the rectangle with the new color 
         }, 
         onComplete: () => {
          this.frame.clear() // Clear the current graphics object
          this.frame.lineStyle(3, 0xffffff) // Restore color
          this.frame.strokeRect(8, 140, 423, 361)// Draw the rectangle with the new color 
          
         }
      })
    }
 

    //-----------------------------------------add AUDIO
    fnc.createAudio(this, 'bgLearn', 0.3, true, 500).play()
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()

    this.load.once('complete', () => {
      this.currentSound  = fnc.createAudio(this, startAnimal.enName, 1, false, 0, 3000, true)
      this.currentSound.play() 
     })
    //  this.load.start();


    //---------------------------------------add IMAGES

    //---arrows
    this.red = this.add.image(cfg.width /2, 100, 'arrowRed').setScale(0.5)
    this.white = this.add.image(cfg.width / 2, 100, 'arrowWhite').setScale(0.5)
    

    //----------- buttons  
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)

    //---language stickers
    this.add.image(50, cfg.height / 2 + 80, 'bg').setScale(0.5)
    this.add.image(50, cfg.height / 2 + 160, 'ru').setScale(0.5)
    this.add.image(50, cfg.height / 2 + 240, 'gb').setScale(0.5)
    //-------------------------------------- add TEXT
    fnc.createText(this, cfg.width / 2 - 70, 20, 'LEARN', 46, 'white')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)

    //---animal names 
 
    this.bgNameText = fnc.createText(this,100, cfg.height / 2 + 62, `Име: ${startAnimal.bgName}`, 32, 'white')
      .setTintFill(0xffffff, 0x00ff00, 0xff0000, 0xffffff)
    this.ruNameText = fnc.createText(this,100, cfg.height / 2 + 142, `Имя: ${startAnimal.ruName}`, 32, 'white')
      .setTintFill(0xffffff, 0x00ff00, 0xff0000, 0xffffff)
    this.enNameText = fnc.createText(this,100, cfg.height / 2 + 222, `Name: ${startAnimal.enName}`, 32, 'white')
      .setTintFill(0xffffff, 0x00ff00, 0xff0000, 0xffffff)
    this.speciesText = fnc.createText(this,14, cfg.height / 2 + 302, `Species: ${startAnimal.species}`, 32, 'white')
      .setTintFill(0xffffff, 0x00ff00, 0xff0000, 0xffffff)
    this.groupText = fnc.createText(this, 14, cfg.height / 2 + 382, `Group: ${startAnimal.group}`, 32, 'white')
      .setTintFill(0xffffff, 0x00ff00, 0xff0000, 0xffffff)
 


    
    // Load the images dynamically in phone scroll
    let animalsArrayAll = this.animalsDataArray
      .filter(x => x.image)
      .map(x => {
          let currentAnimalImage = x.image.split('/')[2].slice(0, -4)
          this.load.image(currentAnimalImage, `/assets/images/animals/${currentAnimalImage}.png`)
        return currentAnimalImage;
      });
    
  
    // Index of the currently displayed image
    let currentImageIndex = cfg.global.currentAnimalIndex -1 // currentAnimalIndex
    

    // Callback function once all images are loaded
    this.load.on('complete', () => {
      // Create an array to store the loaded images
      let images = animalsArrayAll.map(animal => {
        const image = this.add.image(10, 140, animal)
          .setOrigin(0, 0)
          .setScale(0.82, 0.7)
          .setVisible(false)
          .setInteractive() // Make the image interactive
        return image
      })

      // Register touch events on the interactive image objects Only on image Area
      images.forEach(image => {
        image.on('pointerdown', handlePointerDown);
        image.on('pointerup', handlePointerUp);
      });


      // Variables to track touch input
      let startX = 0;
      let startY = 0;

      function handlePointerDown(pointer) {
        startX = pointer.x;
        startY = pointer.y;
      }

      function handlePointerUp(pointer) {
        const deltaX = pointer.x - startX;
        const deltaY = pointer.y - startY;

        // Check if swipe is horizontal and long enough
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          // Swipe left
          if (deltaX < 0) {
            currentImageIndex = showNextImage();
          }
          // Swipe right
          else {
            currentImageIndex = showPreviousImage();
          }
        }
      }


      function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        displayCurrentImage();
        return currentImageIndex;
      }

      // Remove the `let` keyword from the currentImageIndex declaration within this scope
      currentImageIndex = showNextImage();


      function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        displayCurrentImage();
        return currentImageIndex;
      }

      function displayCurrentImage() {
        // Hide all images
        images.forEach(image => {
          image.setVisible(false);
        });

        // Show the current image
        images[currentImageIndex].setVisible(true);
        //console.log('Current Image Index:', currentImageIndex) // Log the current index
        // set global index to current index
        cfg.global.currentAnimalIndex = currentImageIndex
      }
      
      // Initial display of the first image
      displayCurrentImage();
      // return current animal index
      return currentImageIndex
    });

    // Start loading assets
     this.load.start();

    //---------------------------------------------end scroll phone

    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, ]).forEach((btn, index) => {
      btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xe0e0e0))
        .on('pointerout', () => btn.setTint(0xffffff))
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            this.game.sound.stopAll();
            const currentScene = this.scene.scene;
            this.scene.stop(currentScene);
            this.scene.start('MenuScene')
            // cfg.global.currentAnimalIndex = 0
          }

          //---------play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else this.soundBtnClick()
        })
    })


  }

  update(deltaTime) {
    // animate arrows
    if (String(deltaTime).slice(1, 2) & 1) {
      this.white.visible = false
    } else {
      this.white.visible = true
    }

    if (cfg.global.currentAnimalIndex != this.counter) {
      this.counter = cfg.global.currentAnimalIndex
      this.updateDataWithCurrentImageIndex()
      // if index changed, Start again the initial tween to animate frame
      this.createTween();
    }
  }

  updateDataWithCurrentImageIndex = () => {
    const { enName, bgName, ruName, species, description, group } = this.animalsDataArray[cfg.global.currentAnimalIndex]
    this.bgNameText.setText(`Име: ${bgName}`)
    this.ruNameText.setText(`Имя: ${ruName}`)
    this.enNameText.setText(`Name: ${enName}`)
    this.speciesText.setText(`Species: ${species}`)
    this.groupText.setText(`Group: ${group}`)
    
    // fix text size if biggest on screen
    // if (this.bgNameText.text.length > 18 || this.ruNameText.setFontSize('20px') > 18 || this.enNameText.setFontSize('20px') > 18   ) {
    //   this.bgNameText.setFontSize('30px')
    //   this.ruNameText.setFontSize('30px')
    //   this.enNameText.setFontSize('30px')
    // } else {
    //   this.bgNameText.setFontSize('32px')
    //   this.ruNameText.setFontSize('32px')
    //   this.enNameText.setFontSize('32px')
    // }

    //stop all sounds without bgLearn  and play and add new audio
    this.game.sound.sounds.map(x => x.key == 'bgLearn' ? null :x.stop())
    this.currentSound = fnc.createAudio(this, enName, 1, false, 0, 3000, true).play()
    
  }
}