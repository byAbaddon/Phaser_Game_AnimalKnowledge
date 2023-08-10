function loadMultiImages(currentScene=null, imgName = String, imgPath = String, numPictures = Number,) {
  for (let i = 1; i <= numPictures; i++) {
    currentScene.load.image(`${imgName + i}`, `${imgPath + i}.png`)
  }  
}

export default loadMultiImages