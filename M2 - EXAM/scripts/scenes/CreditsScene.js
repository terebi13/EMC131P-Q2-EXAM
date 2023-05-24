export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  preload() {
    this.load.image('creditsbackground', "/assets/background/creditsbg.png");
    this.load.image('back', "/assets/images/back.png");
  }

  create() {

    this.add.image(this.cameras.main.centerX,
        250, 'creditsbackground').setScale(2.8);

    let backImage = this.add.image(50,50, 'back').setScale(1);
    backImage.setInteractive({ useHandCursor: true });
    backImage.on('pointerdown', () => this.backButton());
}
backButton() {

    this.scene.start("MainMenuScene")
}
}