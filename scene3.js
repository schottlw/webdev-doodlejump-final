class Scene3 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

  create() {   
        //background
        this.add.image(240, 320, 'background')
        .setScrollFactor(0,0);

        //platform group
        this.platforms = this.physics.add.staticGroup();

        // platform at start so player doesn't automatically fall
        // TODO: Kill when off-screen
        this.startPlatform = this.physics.add.sprite(250, 550, "platform").setScale(0.2);
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
        this.player = this.physics.add.sprite(250, 350, "player").setScale(1.2);

        this.player.setGravityY(300);
        this.player.setBounce(0.2);

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        //camera
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setDeadzone(this.scale.width * 1.5);

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
                platform.y = scrollY - Phaser.Math.Between(50,80);
                platform.body.updateFromGameObject();
            }
        })

        this.movePlayer();

        this.horizontalWrap(this.player)

    // infinite bounce
        let touchingDown = this.player.body.touching.down;
        if (touchingDown) {
        this.player.setVelocityY(-300);
        }

    }

    movePlayer(){
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-200);
           
            this.player.anims.play('left', true);
          }
    
          else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200);
      
            this.player.anims.play('right', true);
          }
    
          else {
            this.player.setVelocityX(0);
      
            this.player.anims.play('turn');
          }
      
          if (this.cursorKeys.up.isDown && this.player.body.touching.down) {  
            this.player.setVelocityY(-330);
          }
      
          /* if (this.cursorKeys.space.isDown) {
            shootBeam(this);
           var position=this.player.x;
          } */
    }

    // player wraps around screen 
    horizontalWrap(player){
        var halfWidth = player.displayWidth * 0.5;
        var gameWidth = this.scale.width;
        if (player.x < -halfWidth){
            player.x = gameWidth + halfWidth
        }
        else if(player.x > gameWidth + halfWidth){
            player.x = -halfWidth
        }
    }


}