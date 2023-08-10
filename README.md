# Phaser_Game_AnimalsKnowledge

### Created a project using:
+ Phaser 3
+ JS
+ Simple - HTML / CSS
+ webpack
+ bable
+ cordova
+ android stuido
+ +

# Game - AnimalsKnowledge
- Educational game about animals on; Bulgarian, Russian and English language.

## Playing the game
Before the game you can practice flipping through the different animals and learning their names on; Bulgarian, Russian and English.
The aim of the game is to find the correct name of the animal from the different possible options.
You will get points depending on the correct answers.
If you get more than ten wrong answers, it's game over.

### Notes:
```diff
- Not suport landscape position!
```
## Short video intro:
https://youtu.be/vWGrM5VqsD4

## Screenshots:
![1](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/47b04192-7033-466d-9749-54838117c64a)
![2](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/3e6b3051-4e3b-401a-8e35-63c8d2229445)
![3](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/14c06834-275d-4474-a8ab-41d2afa41584)
![4](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/75acc928-044e-492f-82d8-1685fb088e82)
![5](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/923bdaef-8d53-4a4a-9722-c3860ee3c974)
![6](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/0f55d114-0154-444e-a4ae-75dcae3c3ee4)
![7](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/6880e78f-4012-4f46-bbcb-c64a1c59229c)
![8](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/bb803e9b-eb95-4f8e-9102-4cac6861b3f2)
![9](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/11d04cc3-33a1-4ce8-bf37-b0fc4cffea44)
![10](https://github.com/byAbaddon/Phaser_Game_AnimalKnowledge/assets/51271834/054cc9c8-2e13-4f67-aa97-24c966b4a322)


### Download
#### Created with Phaser 3 and converted for android mobile app.
##### download apk file:



### Prerequisites
- [Phaser 3](https://phaser.io)

#### Year:
2023

### Developer
By Abaddon

<br>
<br>

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
