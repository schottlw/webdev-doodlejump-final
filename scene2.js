class Scene2 extends Phaser.Scene{
    constructor() {
        super("playGame");
    }

    create() {
        //background
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        //platform group
        // TODO: Prevent platforms from moving when player hits
        this.platforms = this.physics.add.group();
        this.platforms.setVelocityY(0);

        for (var i = 0; i <= 5; i++){
            var x = Phaser.Math.Between(100,400)
            var y = 100*i

            // platform at start so player doesn't automatically fall
            var startPlatform = this.physics.add.sprite(250,450,"platform").setScale(0.2);
            this.platforms.add(startPlatform);

            var platform = this.physics.add.sprite
            (x, y, "platform").setScale(0.2);
            this.platforms.add(platform);
        }

        //player
        this.player = this.physics.add.sprite(250,350,"player").setScale(0.3);

        this.player.setGravityY(200);

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;


        // player, platform collision
        this.physics.add.collider(this.platforms, this.player);

        //listener for keyboard input
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //this.player.setCollideWorldBounds(true);

    }

    update(){
        this.movePlayer();
        
        let touchingDown = this.player.body.touching.down;
        if(touchingDown) {
            this.player.setVelocityY(-250);
        }

    }
    movePlayer(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-100);
        }
        else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(100);
        }
    }

}