function createAnimation(currentScene=null, key = String, numberOfFrames = Number, frameRate = 10, repeatOption = -1, duration = 0
  , yoyo = false, delay = 0 , repeatDelay=0) {
  
  //add frame animation objects
  let framesArray = []
  for (let i = 1; i <= numberOfFrames; i++) {
    framesArray.push({
      'key': key + i,
      'duration': 0
    })
  }
  if (numberOfFrames == 0) framesArray.push(key) 
 
  // console.log('Object ->', currentScene, '\n' ,'Current Scene name ->', currentScene.scene.key);
 

  const animation = currentScene.anims.create({
    key: key, // name animation
    frames: framesArray,
    frameRate: frameRate,
    repeat: repeatOption,
    hideOnComplete: false,
    yoyo,        //default false 
    delay,       //default 0 
    repeatDelay, //default 0 
  })

  // console.log('animation     ' , animation);
  return animation
}


export default createAnimation