class Scene3 extends Phaser.Scene {
    constructor() {
        super("playGame");
        this.weather;
        this.city;
        
    }

  create() {   

        //background
        // this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        // this.background.setOrigin(0, 0);

        //platform group
        var platforms = this.physics.add.staticGroup();

        // platform at start so player doesn't automatically fall
        var startPlatform = platforms.create(250, 450, "platform").setScale(0.2);
        var startBody = startPlatform.body;
        startBody.updateFromGameObject();

        for (var i = 0; i <= 5; i++) {
            var x = Phaser.Math.Between(100, 400)
            var y = 100 * i

            var platform = platforms.create(x, y, 'platform');
            platform.scale = 0.2;

            var body = platform.body;
            body.updateFromGameObject();
        }

        //player
        this.player = this.physics.add.sprite(250, 350, "player").setScale(0.3);

        this.player.setGravityY(200);

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        //this.cameras.main.startFollow(this.player);

        // player, platform collision
        this.physics.add.collider(platforms, this.player);

        //listener for keyboard input
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //this.player.setCollideWorldBounds(true);



    }

   update() {

        this.movePlayer();

        let touchingDown = this.player.body.touching.down;
        if (touchingDown) {
            this.player.setVelocityY(-280);
        }

    }
    movePlayer() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-100);
        }
        else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(100);
        }
    }


    

}