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
        this.platforms = this.physics.add.staticGroup();

        // platform at start so player doesn't automatically fall
        // TODO: Kill when off-screen
        this.startPlatform = this.physics.add.sprite(250, 450, "platform").setScale(0.2);
        this.startPlatform.setImmovable(true);

        for (var i = 0; i <= 5; i++) {
            var x = Phaser.Math.Between(80, 420)
            var y = 100 * i

            var platform = this.platforms.create(x, y, 'platform');
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

        this.cameras.main.startFollow(this.player);

        // player, platform collision
        this.physics.add.collider(this.platforms, this.player);

        this.physics.add.collider(this.startPlatform, this.player);


        //listener for keyboard input
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //this.player.setCollideWorldBounds(true);

    }

   update() {
    // moves platforms at bottom to top for infinite platforms
        this.platforms.children.iterate(child => {
            var platform = child;
            var scrollY = this.cameras.main.scrollY;
            if (platform.y >= scrollY + 500){
                platform.y = scrollY - Phaser.Math.Between(50,100);
                platform.body.updateFromGameObject();
            }
        })

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