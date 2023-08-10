// Assuming you have a globe sprite called 'globe' already loaded and positioned in your scene

//-------------------- Create an animation to rotate the globe
function createRotateAnimation(currentScene=null, arg) { //this,  image
  currentScene.tweens.add({
    targets: arg,
    angle: 360, // Destination angle (full rotation)
    duration: 5000, // Duration of the rotation animation in milliseconds
    repeat: -1, // Repeat indefinitely
    ease: 'Linear', // Easing function (linear for constant speed)
  });
}


//-------------------- Create an animation to Text 
function createTextChangeColorAnimation(currentScene = null, text) {
  //  Apply the gradient fill.
  let gradient = text.context.createLinearGradient(0, 0, 0, text.height);
  gradient.addColorStop(0, '#111111');
  gradient.addColorStop(0.6, '#ffffff');
  gradient.addColorStop(0.6, '#aaaaaa');
  gradient.addColorStop(1, '#111111');
  text.setFill(gradient);
  
 currentScene.tweens.add({ //TODO: not work
    targets: text,
    // duration: 3000,
    fillStyle: { gradientStops: gradient}, // Set the gradient stops here
    yoyo: true,
    repeat: -1,
  })
}


//-------------------- Create an animation to Text Right Left
function crateTextAnimationRightLeftMove(currentScene=null, arg, x=50, delay=500) {
  currentScene.add.tween({
    targets: arg,
    x: x,             // go to end of screen
    duration: 1500,
    yoyo: true, 
    repeat: -1,	    
    delay,
  })
}


//------------------TransitionBetweenScene
//must settimeout to show animation before switch to scene
function transitionBetweenScene(currentScene=null, cfg) {
  //circle
  let circle = currentScene.add.circle(cfg.width / 2,cfg.height / 2, 0, 0x000000, 0.9)
  
  //circle tween
  currentScene.tweens.add({
    targets: circle,
    radius: 500,
    duration: 400,
    yoyo: true,
    loop: 0,
    hold: 10,
  })

  return circle
}




export {
  createRotateAnimation,
  createTextChangeColorAnimation,
  crateTextAnimationRightLeftMove,
  transitionBetweenScene,
}