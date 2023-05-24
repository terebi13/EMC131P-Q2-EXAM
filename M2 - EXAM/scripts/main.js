import MainMenuScene from './scenes/MainMenuScene.js';
import CreditsScene from './scenes/CreditsScene.js';
import GameScene from './scenes/GameScene.js'
import GameTwoScene from './scenes/GameTwoScene.js'
import GameThreeScene from './scenes/GameThreeScene.js'
import GameOverScene from './scenes/GameOverScene.js'
import GameOverTwoScene from './scenes/GameOverTwoScene.js'
import GameOverThreeScene from './scenes/GameOverThreeScene.js'
import WinningScene from './scenes/WinningScene.js'
import WinningSceneTwo from './scenes/WinningSceneTwo.js'
import WinningSceneThree from './scenes/WinningSceneThree.js'

let mainMenuScene = new MainMenuScene();
let creditsScene = new CreditsScene();
let gameScene = new GameScene();
let gameTwoScene = new GameTwoScene();
let gameThreeScene = new GameThreeScene();
let gameOverScene = new GameOverScene();
let gameOverTwoScene = new GameOverTwoScene();
let gameOverThreeScene = new GameOverThreeScene();
let winningScene = new WinningScene();
let winningSceneTwo = new WinningSceneTwo();
let winningSceneThree = new WinningSceneThree();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 495,
    backgroundColor: "#D8FBFF",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },  
};

let game = new Phaser.Game(config);

game.scene.add('MainMenuScene', mainMenuScene);
game.scene.add('CreditsScene', creditsScene)
game.scene.add('GameScene', gameScene);
game.scene.add('GameTwoScene', gameTwoScene);
game.scene.add('GameThreeScene', gameThreeScene);
game.scene.add('GameOverScene', gameOverScene);
game.scene.add('GameTwoOverScene', gameOverTwoScene);
game.scene.add('GameThreeOverScene', gameOverThreeScene);
game.scene.add('WinningScene', winningScene);
game.scene.add('WinningSceneTwo', winningSceneTwo);
game.scene.add('WinningSceneThree', winningSceneThree);

// Starting Scene
game.scene.start('MainMenuScene');
