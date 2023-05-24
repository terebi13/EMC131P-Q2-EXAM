export default class MainMenuScene extends Phaser.Scene {
    constructor() {
      super("MainMenuScene");
    }
  
    preload() {
      this.load.image('background', "/assets/background/bg.png");
      this.load.image('startbackground', "/assets/images/startbg.png");
      this.load.image('start', "/assets/images/start.png");
      this.load.image('exit', "/assets/images/exit.png");
      this.load.image('credits', "/assets/images/credits.png");

      this.load.audio("introBGM", "/assets/audio/MenuBGM.mp3");
      this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
      this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
    }
  
    create() {
      
      let bg = this.add.image(
        this.cameras.main.centerX,
        250,
        "background"
      );
      bg.setScale(3);
  
      //Logo
      let logo = this.add.image(
        this.cameras.main.centerX,
        250,
        "startbackground"
      );
      logo.setScale(1);
  
    // Play Button Coiny Font
    let playButton = this.add.image(
        this.cameras.main.centerX,
        200,
        "start"
    );
    playButton.setScale(1.4);
    playButton.setInteractive({ useHandCursor: true });
    playButton.on("pointerover", () => {
        this.sound.play("buttonHover");
    });
    playButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.play();
    });
  
      // Credits Button
      let creditsButton = this.add.image(
        730,370, 'credits'
      );
      creditsButton.setScale(1);
      creditsButton.setInteractive({ useHandCursor: true });
      creditsButton.on("pointerover", () => {
        this.sound.play("buttonHover");
      });
      creditsButton.on("pointerdown", () => this.credits());
  
      // Quit Button
      let quitButton = this.add.image(
        40,370, 'exit'
      );
      quitButton.setScale(0.6);
      quitButton.setInteractive({ useHandCursor: true });
      quitButton.on("pointerover", () => {
        this.sound.play("buttonHover");
      });
      quitButton.on("pointerdown", () => this.quit())


    if (!this.sound.get("introBGM")) {
      this.introBGM = this.sound.add("introBGM", { loop: true });
      this.introBGM.play();
      this.introBGM.volume = 0.3
    } else if (!this.sound.get("introBGM").isPlaying) {
      this.sound.get("introBGM").play();
    }

    //Hover Button SFX
    let buttonHover = this.sound.add("buttonHover");
    buttonHover.volume = 0.1;

    //Click Button SFX
    let buttonClick = this.sound.add("buttonClick");
    buttonClick.volume = 1;

    }
  
    play() {
      this.scene.start("GameScene");
      this.sound.stopAll();
    }
  
  
    credits() {
      this.scene.start("CreditsScene");
      this.sound.play("buttonClick");
    }
  
    quit() {
        if (confirm("Are you sure you want to quit?")) {
          var newWindow = window.open("", "_self");
          window.close();
          newWindow.close();
        }
      }
  }