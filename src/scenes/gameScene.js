import {Scene} from 'phaser'
import * as fnc from '../game.js';
import {cfg} from '../game.js'


export class GameScene extends Scene {
  constructor() {
    super('GameScene')
    this.currentSound = null
    this.currentLanguage = null
    this.currentAnimalName = null
    this.allAnimalsByLanguage = null
    this.counterStar = 0
    this.currentAnimalImage = null
  }

  init() {
    console.log('Welcome to GameScene...')
    this.game.sound.stopAll()  //stop all sounds
    this.correctCountPoints = 0
    this.incorrectCountPoints = 0
  }

  preload() {
    //----------------json DATA 
     //----load json animal DATA 
    //was automatic load and save in cfg.global.globalDataJSON
    //------------------------------load AUDIO
    this.load.audio('bgQuiz', '/assets/sounds/background/bgQuiz.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('correctAnswerSound', '/assets/sounds/effects/answers/correctAnswer.wav')
    this.load.audio('incorrectAnswerSound', '../assets/sounds/effects/answers/incorrectAnswer.wav')


    //-----------------------------load IMAGES
    //---arrows
    this.load.image('arrowRed', '/assets/images/arrows/red.png')
    this.load.image('arrowWhite', '/assets/images/arrows/white.png')
    //---language stickers
    this.load.image('bg', '/assets/images/flags/bg.png')
    this.load.image('ru', '/assets/images/flags/ru.png')
    this.load.image('gb', '/assets/images/flags/gb.png')
    //---cup
    this.load.image('goldCup', '/assets/images/cup/goldCup.png')
    this.load.image('silverCup', '/assets/images/cup/silverCup.png')
    this.load.image('bronzeCup', '/assets/images/cup/bronzeCup.png')
    //---star
    this.load.image('star', '/assets/images/star/star.png')
    
    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')

  }

  create() {
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    fnc.checkOrientation(this)
    //--------------------------------------- add DATA
    //frame
    this.frame = this.add.graphics().lineStyle(3, 0xffffff).strokeRect(8, 140, 423, 361)
    
    //text before load
    let load = fnc.createText(this, cfg.width / 2 - 140, cfg.height / 2 - 200, 'Loading...', 60, 'white', null, 'bold')
    fnc.tweenAnimation.createTextChangeColorAnimation(this, load)

    //tween frame animation
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
    this.soundBgQuiz = () => fnc.createAudio(this, 'bgQuiz', 0.1, true, 500).play()
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundCorrectAnswer = () => fnc.createAudio(this, 'correctAnswerSound',).play()
    this.soundIncorrectAnswer = () => fnc.createAudio(this, 'incorrectAnswerSound', 0.5).play()
 


    //---------------------------------------add IMAGES
    //---cup
    this.goldCup = this.add.image( 35, 55, 'goldCup').setScale(0.1).setVisible(false)
    this.silverCup = this.add.image( 35, 55, 'silverCup').setScale(0.1).setVisible(false)
    this.bronzeCup = this.add.image( 35, 50, 'bronzeCup').setScale(0.1).setVisible(false)
    //---star
    this.star = this.add.image( 10, cfg.height / 2 + 50, 'star').setScale(0.2).setVisible(false)
    //----------- buttons  
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)

    //-------------------------------------- add TEXT
    //---play
    fnc.createText(this, cfg.width / 2 - 55, 20, 'PLAY', 46, 'white')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    //---correctAnswer
    this.correct = fnc.createText(this, 30, 100, `Correct: ${this.correctCountPoints}`, 30, 'green')
    //---incorrectAnswer
    this.incorrect = fnc.createText(this, 240, 100, `Incorrect: ${this.incorrectCountPoints}`, 30, 'brown')
    

    //---------------frame rect hide playground field
    const frameRect = this.add.rectangle(4, 138, 440, 660, 'rgb(10,40,19)').setOrigin(0, 0)
    //-----------Container
    const labelInfo = fnc.createText(this, 190, 180, 'INFO', '3em', 'gold')
    const labelOne = fnc.createText(this, 15, 240, 'Choose correctly:\n animal by name, and\n increase bonus points.', '3em')
    const labelTwo = fnc.createText(this, 10, 420, 'If you get more ten wrong\n answer, Game Over.', '3em', 'crimson')
    const labelThree = fnc.createText(this, 15, 560, 'Choose a language:\n press the selected label.', '3em', 'cornflowerblue')

    //---language stickers
    this.bgLabel = this.add.image(70, 700, 'bg').setScale(0.65)
    this.ruLabel = this.add.image(220, 700, 'ru').setScale(0.65)
    this.gbLabel = this.add.image(360, 700, 'gb').setScale(0.6)

    let textContainer = this.add.container(10)
    textContainer.add([labelOne, labelTwo, labelInfo, labelThree, this.bgLabel, this.ruLabel, this.gbLabel])
  

    //-------------------------((( engine  )))------------------------------
    //1) function generateAnimal create new animal



    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, this.bgLabel, this.ruLabel, this.gbLabel,]).forEach((btn, index) => {
      btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xe0e0e0))
        .on('pointerout', () => btn.setTint(0xffffff))
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            this.game.sound.stopAll()
            const currentScene = this.scene.scene
            this.scene.stop(currentScene)
            this.scene.start('MenuScene')
          }
          //---------play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else this.soundBtnClick()
          
          if (index == 1 || index == 2 || index == 3) {  //hide info container
            
            if (index == 1) {
              this.currentLanguage = 'bgName'
            }
            if (index == 2) {
              this.currentLanguage = 'ruName'
            }
            if (index == 3) {
              this.currentLanguage = 'enName'
            }
            this.allAnimalsByLanguage = cfg.global.globalDataJSON.map(x => x[this.currentLanguage])
            //hide info label and generate animal
            frameRect.setVisible(false)
            textContainer.setVisible(false)
            //---play bg music
            this.soundBgQuiz()
            //---go to function to generate animal
            this.generateAnimal()
          }
          
        })
    })

  }

  update(deltaTime) { }

  //=====================================  Custom Function =======================
  
  //---------------------------Generate Animal  / Load the images
  generateAnimal() {
    // console.log(cfg.global.globalDataJSON);
    // console.log(this.allAnimalsByLanguage);
    //---get random animal data 
    let randNumb = Phaser.Math.Between(0, cfg.global.globalDataJSON.length-1)
    this.currentAnimalData = cfg.global.globalDataJSON[randNumb]
    this.currentAnimalImage = this.currentAnimalData.image.split('/')[2].slice(0, -4)
    this.load.image(this.currentAnimalImage, `/assets/images/animals/${this.currentAnimalImage}.png`)
 
    this.load.on('complete', () => {
      this.image = this.add.image(10, 142, this.currentAnimalImage).setOrigin(0, 0).setScale(0.82, 0.7).setInteractive()
      // Listen for the 'pointerdown' event on the image
      this.image.on('pointerdown', (pointer) => {   
        if (this.sound.getAllPlaying().length == 1) {
          this.currentSound.stop()
          fnc.createAudio(this, this.currentAnimalData.enName, 1, false, 0, 3000, true).play()
        } 
     });
    }).start()

   //---get current sound by current animalAnimalData
   this.load.once('complete', () => {
     this.currentSound = fnc.createAudio(this, this.currentAnimalData.enName, 1, false, 0, 3000, true)
     this.currentSound.play()
  }).start()
    // this.load.start();
   
    let animalName = this.currentAnimalData[this.currentLanguage]
    //call function generateAnswer
    this.generateAnswers(animalName)
  }
  

  //------------------------------------ Generate Labels / answers
  generateAnswers(animalName) {
    //----------------------Get Data by Names Just console log
    // console.log(animalName)
  
    //----------------------TEXT---------
    this.infoText1 = fnc.createText(this, 5, 720,  'Choose the correct answer!', 31, 'aliceblue').setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    this.infoText2 = fnc.createText(this, 30, 780,  'Tap the picture to hear\n the animal sound again.', 31, 'aliceblue', null, 'italic')
    if (this.correctCountPoints >= 1) {
      this.infoText1.setVisible(false)
      this.infoText2.setVisible(false)
    }

    //----- set how many labels of ellipse be show
    let numberOfNames = 2
    if (this.correctCountPoints > 5) {
      numberOfNames = 4
    }
    if (this.correctCountPoints > 10) {
      numberOfNames = 6
    }

    //-----------------------Generate Color
    // Generate a random color for the ellipse fill
    function rgbToHexColor() {
      const randomColor = Phaser.Display.Color.RandomRGB(10, 255)
      const { r, g, b } = randomColor   
      // convert RGB to hexadecimal
      return (r << 16) | (g << 8) | b;
    }
   
    //---------------------Generate Random Names
    let randomNames = []
    
    //---fill randomNames Array
    while (numberOfNames) {
      let randNum = Phaser.Math.Between(0, this.allAnimalsByLanguage.length - 1)
      let randAnimal = this.allAnimalsByLanguage[randNum]
      // console.log(randAnimal  ,' - rand animal' , ' rand number' , randNum);
      if (!randomNames.includes(animalName) || !randomNames.includes(randAnimal)) {
          randomNames.push(randAnimal)
          numberOfNames--
      }
    }

   
      //put animalName on random position to randomNames array
      let randNumPosition = Phaser.Math.Between(0, randomNames.length - 1)
      randomNames[randNumPosition] = animalName
      // console.log( randomNames);
     
    //-------------------------Generate Labels
    let ellipsesArr = []
    const width = 156
    const height = 84
    const positionArr = [[100, 600], [335 , 600], [100, 730], [335, 730], [100, 860], [335, 860]]
    
    for (let i = 0; i < randomNames.length; i++) {
      // console.log(i, randomNames[i]);
      const [x,y] = positionArr[i]
      let ellipse = this.add.ellipse(x, y, width, height, rgbToHexColor(), 0.8).setStrokeStyle(2, 0xffffff, 0.6)
      let leftCenter = ellipse.getCenter()
      let text = randomNames[i]
      let textSize = text.length < 10 ? '26px' : '20px'
      let textFix = text.length < 10 ? 7.2 : 5.4
      // let textEllipse = ''
      // if (textEllipse.length) textEllipse.destroy();
      let textEllipse = fnc.createText(this, leftCenter.x - text.length * textFix, leftCenter.y - 17, text, textSize, null, null, 'bold')
      //add data to array     
      ellipsesArr.push([{ ellipse , textEllipse}]);
    }
  
    // ------------------------ Set Interactive and get points
    ellipsesArr.forEach((element) => {
      const { ellipse, textEllipse } = element[0]
      const ownColor = ellipse.fillColor
        ellipse.setInteractive({ cursor: 'pointer' })
          .on('pointerover', () => ellipse.setStrokeStyle(2, 0xff0000, 0.6))   //.setFillStyle(0xe0e0e0))
          .on('pointerout', () => ellipse.setStrokeStyle(2, 0xffffff, 0.6))   //.setFillStyle(ownColor))
          .on('pointerdown', () => {
            //hide info text
            this.infoText1.setVisible(false)
            this.infoText2.setVisible(false)
            // add points -> increase or decrease 
            if (textEllipse.text == animalName) {
              this.soundCorrectAnswer()
              this.correctCountPoints++
              this.correct.setText(`Correct: ${this.correctCountPoints}`)
 
              //clear all old ellipse 
              for (const element of ellipsesArr) {
                const { ellipse, textEllipse } = element[0]
                ellipse.destroy()
                if (textEllipse) textEllipse.destroy()
              }
            
              //---call star creator function to add stars progress
              this.starCreator()
              //--- call function to generate new animal image
              this.generateAnimal()
             
           
          
              //stop old animal sound 
              // try {
              //   this.sound.getAllPlaying().map(x => x.key != 'bgQuiz'? x.stop() : null)
              // } catch (error) { console.log(error)}
      
            } else {
              this.soundIncorrectAnswer()
              this.incorrectCountPoints++
              this.incorrect.setText(`Incorrect: ${this.incorrectCountPoints}`)
              if (this.incorrectCountPoints >= 10) {
                this.scene.start('GameOverScene')
              }
            }
          })
      })
    

    //--------------------------------------- Tweens
    this.tweens.add({
      targets: ellipsesArr.map( x => x[0].ellipse && x[0].textEllipse),
       scaleX: 0.96,
       scaleY: 0.96,
       alpha: 0.9,
       yoyo: true,
       repeat: -1,
       ease: 'Sine.easeInOut'
    });

  }
  
  
  starCreator() {
      if (!this.myStarGroup) {
        this.myStarGroup = this.add.group()
        this.counterStar = 0
      }
      //spacing between images
      const spacing = 45//51
      const maxStars = 10
    

      if (this.counterStar >= maxStars) {
        this.myStarGroup.clear(true, true);
        this.counterStar = 0;
      }
    
      this.counterStar++;
      this.star.setVisible(true);
    
      for (let i = 1; i < this.counterStar; i++) {
        const clonedImage = this.add.image(this.star.x + spacing * i, this.star.y, 'star').setScale(0.2);
        this.myStarGroup.add(clonedImage);
      }
     
   //---------------------add cup
    if (this.correctCountPoints == 11) {
      this.bronzeCup.setVisible(true)
    }
    if (this.correctCountPoints == 21) {
      this.bronzeCup.setVisible(false)
      this.silverCup.setVisible(true)
    }
    if (this.correctCountPoints == 30) {
      this.silverCup.setVisible(false)
      this.goldCup.setVisible(true)
      //call Final function
      this.scene.start('FinalScene')
    }

 }

  
}