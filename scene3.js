class Scene3 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

  create() {   
        //background
        //TODO: find another background that fits new game dimensions
        //TODO: get weather api background
       // this.add.image(240, 320, 'background')
        //.setScrollFactor(0,0);

        //platform group
        this.platforms = this.physics.add.staticGroup();

        //star group
        this.stars = this.physics.add.staticGroup();

        // platform at start so player doesn't automatically fall
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

        this.player.setGravityY(280);
        //this.player.setBounce(0.5);

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        //cameras
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setDeadzone(this.scale.width * 1.5);

        // player, platform collision
        this.physics.add.collider(this.platforms, this.player);

        this.physics.add.collider(this.startPlatform, this.player);

        // platform, star collision
        this.physics.add.collider(this.platforms, this.stars);

        //listener for keyboard input
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // score
        this.starsCollected = 0;

        var style = { color: '#ffffff', fontSize: 20};
        this.starsCollectedText = this.add.text(240, 10, 'Stars: 0', style)
        .setOrigin(-1.3,0)
        .setScrollFactor(0)

        // star, player overlap
        this.physics.add.overlap(this.player, this.stars,this.starCollect, undefined, this);

    }

   update() {
    // moves platforms at bottom to top for infinite platforms
        this.platforms.children.iterate(child => {
            var platform = child;
            var scrollY = this.cameras.main.scrollY;
            if (platform.y >= scrollY + 600){
                platform.y = scrollY - Phaser.Math.Between(50,70);
                platform.body.updateFromGameObject();

                this.AddStars(platform);
            }
        })

    // kills stars if not grabbed
        this.stars.children.iterate(child => {
            var star = child;
            var scrollY = this.cameras.main.scrollY;
            if (star.y >= scrollY + 600){
                this.stars.killAndHide(star);
            }
        })

        this.movePlayer();

        this.horizontalWrap(this.player);


    // infinite bounce
        let touchingDown = this.player.body.touching.down;
        if (touchingDown) {
        this.player.setVelocityY(-330);
        }

    // game over
        var score = this.starsCollected;
        var bottomPlatform = this.findBottom()
        if (this.player.y > bottomPlatform.y + 200){
            this.scene.start("gameOver", {score});
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

          else if (this.cursorKeys.down.isDown) {  
            this.player.setVelocityY(300);
          }
    
          else {
            this.player.setVelocityX(0);
      
            this.player.anims.play('turn');
          }

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

    findBottom(){
        var platforms = this.platforms.getChildren()
        let bottomPlatform = platforms[0];

        for (let i = 1; i < platforms.length; i++){
            var platform = platforms[i];
            if (platform.y < bottomPlatform.y){
                continue
            }

            bottomPlatform = platform;
        }

        return bottomPlatform;
    }

    AddStars(sprite){
        var y = sprite.y - sprite.displayHeight
        var star = this.stars.create(sprite.x, y, 'star').setScale(0.3);
        star.body.setSize(star.width, star.height)
        return star;
    }

    starCollect(player,star){
        this.stars.killAndHide(star);
        this.physics.world.disableBody(star.body);
        this.starsCollected++;

        var value = `Stars: ${this.starsCollected}`
        this.starsCollectedText.text = value;
    }


}