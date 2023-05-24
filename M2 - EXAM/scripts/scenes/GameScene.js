export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
    }

    init(){
        this.lives = 3;
        this.player;
        this.coins;
        this.cursors;
        this.coinsScore = 0;
        this.coinCounter = 0;
        this.score = 0;
        this.pMobs;
        this.gEnemies;
    }

    preload(){
        this.load.image('tiles', './assets/maps/sheetB.png');
        this.load.tilemapTiledJSON('tilemap', './assets/maps/map.tmj');
        this.load.image('heart', './assets/icons/heart.png');
        this.load.image('coin', './assets/images/coin.png');
        this.load.image('turtleshell', './assets/images/turtleshell.png');
        this.load.image('crab', './assets/images/crab.png');
        this.load.spritesheet('player', '/assets/images/pirate.png', {frameWidth: 62, frameHeight: 48});

        //backgrounds
        this.load.image('bg', './assets/background/1.png');
        this.load.image('bg2', './assets/background/2.png');
        this.load.image('bg3', './assets/background/3.png');
        this.load.image('bg4', './assets/background/4.png');
        this.load.image('bg5', './assets/background/5.png');
        this.load.image('bg6', './assets/background/6.png');

        //audio
        this.load.audio("gameBGM", "/assets/audio/GameBGM.mp3");
        this.load.audio("CollectCoin", "/assets/audio/CollectCoinSFX.mp3");
        this.load.audio("Hitsfx", "/assets/audio/HitSFX.wav");
        this.load.audio("JumpHitEnemysfx", "/assets/audio/JumpHitEnemySFX.mp3");
        this.load.audio("JumpHitBluesfx", "/assets/audio/JumpHitBlueSFX.mp3");
        this.load.audio("FriendHitEnemysfx", "/assets/audio/FriendHitEnemySFX.mp3");
    }

    
    create(){
        
        let bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setScale(3).setScrollFactor(0.3);
        let bg2 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg2').setDepth(-3).setScale(3).setScrollFactor(0.3);
        let bg3 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3').setDepth(-1).setScale(3).setScrollFactor(0.1);
        let bg4 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg4').setDepth(-2).setScale(3).setScrollFactor(0.2);
        let bg5 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg4').setDepth(-2).setScale(3).setScrollFactor(0.2);
        let bg6 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg6').setDepth(-5).setScale(3).setScrollFactor(0);

        
        this.cameras.main.startFollow(bg);
        
        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.cameras.main.fadeIn(2000);
            this.cameras.main.setScroll(0, 0);
            this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        }, this);
        
        this.cameras.main.setBounds(0, 0, bg.width * 2, bg.height);
        
        this.cameras.main.setScroll(0, 0);
        
        this.cameras.main.setZoom(1);
        
        this.cameras.main.setLerp(0.1);
        
        this.cameras.main.setBackgroundColor('#000000');
        
        this.cameras.main.fadeIn(2000);
        
        this.cameras.main.on('cameraupdate', function () {
            bg.x = this.cameras.main.scrollX * 0.1;
            bg2.x = this.cameras.main.scrollX * 0.3;
            bg3.x = this.cameras.main.scrollX * 0.6;
            bg4.x = this.cameras.main.scrollX * 0.9;
            bg5.x = this.cameras.main.scrollX * 0.9;
            bg6.x = this.cameras.main.scrollX * 0.9;

        }, this);

        //BGM
        this.sound.play("gameBGM", { loop: true, volume: 0.2 });

        // Map
        this.map = this.make.tilemap({key: 'tilemap'});
        this.tileset = this.map.addTilesetImage('sheetB', 'tiles');
        this.platform = this.map.createLayer('platform', this.tileset, 0, 60);
        this.flag = this.map.createLayer('flag', this.tileset, 0, 60);
        this.water = this.map.createLayer('water', this.tileset, 0, 60);
    
        this.map.createLayer('extra details', this.tileset, 0, 60)
    
        this.flag.setCollisionByExclusion(-1, true);
        this.platform.setCollisionByExclusion(-1, true);
        this.water.setCollisionByExclusion(-1, true);
    
        // Coins
        this.CoinLayer = this.map.getObjectLayer('coins')['objects'];
        
        this.coins = this.physics.add.staticGroup()
        this.CoinLayer.forEach(object => {
            let obj = this.coins.create(object.x, object.y, "coin"); 
            obj.setScale(object.width/18, object.height/18); 
            obj.setOrigin(0, -2); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
    
        // crab
        this.enemyGround = this.map.getObjectLayer('ground enemies')['objects'];
    
        this.gEnemies = this.physics.add.group();
        this.enemyGround.forEach(object => {
            let obj = this.gEnemies.create(object.x, object.y, "crab");
            obj.setScale(.3);
            obj.setScale(object.width/20, object.height/16); 
            obj.setOrigin(0);
            obj.setImmovable([true]); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
        
        // turtleshell
        this.pushMobs = this.map.getObjectLayer('push mobs')['objects'];
        
        this.pMobs = this.physics.add.group();
        this.pushMobs.forEach(object => {
            let obj = this.pMobs.create(object.x, object.y, "turtleshell");
            obj.setScale(object.width/20, object.height/20); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
    
        // Player
        this.player = this.physics.add.sprite(180, 350, 'player').setScale(.5);
    
        this.player.setCollideWorldBounds(false);
    
        this.anims.create({
            key: 'left',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 1,
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 1 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: [ { key: 'player', frame: 2 } ],
            frameRate: 1,
        });

        this.player.invulnerable = false;

        // health 
        this.heart1 = this.add.sprite(30, 50, 'heart').setScrollFactor(0);
        this.heart2 = this.add.sprite(60, 50, 'heart').setScrollFactor(0);
        this.heart3 = this.add.sprite(90, 50, 'heart').setScrollFactor(0);

        // Texts
        this.coinText = this.add.text(180, 10, `Coins: ${this.coinsScore}x`, {
            fontSize: '20px',
            fill: '#000000'
          });
        this.coinText.setScrollFactor(0);
    
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#000000'
        });
        this.scoreText.setScrollFactor(0);
    
        // Physics and Camera
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.pMobs);
        this.physics.add.collider(this.pMobs, this.platform);
        this.physics.add.collider(this.gEnemies, this.platform);
        

        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.player, this.pMobs, this.upMob, null, this);
        this.physics.add.collider(this.pMobs, this.gEnemies, this.hitMob, null, this);

        // Lose Conditions - If player collides with crab and water
        this.physics.add.collider(this.player, this.water, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.gEnemies, this.hitEnemy, null, this);
        
        // Win Conditions - If player collides with the flag at the end of the map
        this.physics.add.collider(this.player, this.flag, this.clear, null, this);
    
        this.cameras.main
        .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        .startFollow(this.player);
    }
    
    update(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 150;
        

        if (this.cursors.left.isDown){
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
        }
    
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
        }
    
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }   
    
        if (this.cursors.up.isDown && this.player.body.onFloor()){
            this.player.setVelocityY(-380);
        }
    }
    
    collectCoins(player, coins){
        coins.destroy(coins.x, coins.y)
        this.coinsScore ++;
        this.coinCounter ++;
    
        this.coinText.setText(`Coins: ${this.coinsScore}`);

        if(this.coinCounter==10){
            this.score+=100
            this.scoreText.setText(`Score: ${this.score}`);
            this.coinCounter = 0;
        }
    
        if(this.coinsScore==10){
            this.score+=100
            this.scoreText.setText(`Score: ${this.score}`);
        }
        
        this.sound.play("CollectCoin", { volume: 0.2 });
    
        return false; 
    }
    hitEnemy(player, gEnemies){

        player.setVelocityY(-400)
    
        if(gEnemies.body.touching.up && !gEnemies.hit){
            this.sound.play("JumpHitEnemysfx");
            gEnemies.disableBody(false,false);
            this.tweens.add({
                targets: gEnemies,
                alpha: 0.3,
                scaleX: 1.5,
                scaleY: 1.5,
                ease: 'Linear',
                duration: 200,
                onComplete: function() {
                    gEnemies.destroy(gEnemies.x, gEnemies.y);
                },
            });
    
            this.score+=100
            this.scoreText.setText(`Score: ${this.score}`);
            
        }
    
        else{
            if (player.invulnerable == false){
                this.sound.play("Hitsfx");
                this.lives-=1
                player.setTint(0xff0000);
                player.invulnerable = true;
                
                if (this.lives == 2){
                    this.tweens.add({
                        targets: this.heart3,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        ease: 'Linear',
                        duration: 200
                    });
                }
    
                else if(this.lives == 1){
                    this.tweens.add({
                        targets: this.heart2,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        ease: 'Linear',
                        duration: 200
                    });
                }
            }
    
            // remove I-frame
            this.time.delayedCall(1000, this.removeIFrame, [], this);
    
            if(this.lives==0){
                this.sound.play("Hitsfx");
                this.scene.start("GameOverScene")
                this.sound.stopAll();
            }
        }
    }

    removeIFrame(){
        this.player.clearTint()
        this.player.invulnerable = false;
    }
    
    hitMob (pMobs, gEnemies){
        
        pMobs.setVelocityX(100)

        gEnemies.disableBody(false,false);
        this.sound.play("FriendHitEnemysfx", { volume : 2});
        this.tweens.add({
            targets: gEnemies,
            alpha: 0.3,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 200,
            onComplete: function() {
                gEnemies.destroy(gEnemies.x, gEnemies.y);
            },
        });
        this.score+=100;
        this.scoreText.setText(`Score: ${this.score}`);    
    }
    
    // when player is up the pMob
    upMob (player, pMobs){

        if(pMobs.body.touching.up && !pMobs.hit){
            this.sound.play("JumpHitBluesfx")
            player.setVelocityY(-400)
        }
    }

    // Win-Lose Fucntions
    clear(){
        this.scene.start("WinningScene")
        this.sound.stopAll();
    }

    gameOver() {
        this.sound.stopAll();
        this.scene.start('GameOverScene');
      }

}
