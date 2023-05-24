export default class GameOverTwoScene extends Phaser.Scene{

    constructor(){
        super("GameOverTwoScene")
    }

    preload() {
        this.load.image('background', "/assets/images/bg.png");
        this.load.image('losebackground', "/assets/images/losebg.png");
        this.load.image('done', "/assets/images/done.png");
        this.load.image('tryagain', "/assets/images/tryagain.png");


        this.load.audio("gameoverBGM", "/assets/audio/GameOverBGM.mp3");
        this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
        this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
    }

    create(){
    //Background
      let bg = this.add.image(
        this.cameras.main.centerX,
        250,
        "background"
      );
      bg.setScale(3);

    //BGM
    this.sound.play("gameoverBGM", { loop: true, volume: 0.3 });

    //Game Over
    let lose = this.add.image(
        this.cameras.main.centerX,
        250,
        "losebackground"
        );
        lose.setScale(1);
        
        let doneButton = this.add.sprite(60,350, "done").setInteractive({useHandCursor: true});
        doneButton.setScale(.8);
        doneButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        doneButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.home();
        });

        let replayButton = this.add.sprite(this.cameras.main.centerX,
            220, "tryagain").setInteractive({useHandCursor: true});
        replayButton.setScale(1);
        replayButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        replayButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.replay();
        });
      

        this.cameras.main.setBackgroundColor('#000000')
        
    }

    replay() {
        this.scene.start("GameTwoScene");
        this.sound.stopAll();
      }

    home() {
        this.scene.start("MainMenuScene");
        this.sound.stopAll();
      }
  
}