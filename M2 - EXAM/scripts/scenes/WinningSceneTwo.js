export default class WinningSceneTwo extends Phaser.Scene{

    constructor(){
        super("WinningSceneTwo")
    }

    preload() {
        this.load.image('background', "/assets/images/bg.png");
        this.load.image('winbackground', "/assets/images/winningSL.png");
        this.load.image('done', "./assets/images/done.png");
        this.load.image('next', "./assets/images/next.png");

        this.load.audio("stageclearBGM", "/assets/audio/StageClearBGM.mp3");
        this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
        this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
    }

    create () {
        let bg = this.add.image(
            this.cameras.main.centerX,
            250,
            "background"
        );
        bg.setScale(3);

        //BGM
        this.sound.play("stageclearBGM", { loop: true, volume: 0.2 });

        //Game Over
        let win = this.add.image(
            this.cameras.main.centerX,
            250,
            "winbackground"
        );
        win.setScale(3);

        let doneButton = this.add.sprite(60,350, "done").setInteractive({useHandCursor: true});
        doneButton.setScale(.6);
        doneButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        doneButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.home();
        });

        let nextButton = this.add.sprite(730,350, "next").setInteractive({useHandCursor: true});
        nextButton.setScale(.6);
        nextButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        nextButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.next();
        });

        this.cameras.main.setBackgroundColor('#000000')
    }

    home() {
        this.scene.start("MainMenuScene");
        this.sound.stopAll();
      }

    next() {
        this.scene.start("GameThreeScene");
        this.sound.stopAll();
      }

}