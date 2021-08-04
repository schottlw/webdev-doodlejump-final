class Scene2 extends Phaser.Scene{
    constructor() {
        super("playGame");
    }

    create(){
    //background
    this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
    this.background.setOrigin(0,0);

    //platform group
    this.platforms = this.physics.add.group();

    for (var i = 0; i <= 5; i++){
        var x = Phaser.Math.Between(100,400)
        var y = 100*i
        var platform = this.physics.add.sprite
        (x, y, "platform").setScale(0.2);
        this.platforms.add(platform);
        }

    //player
    this.player = this.physics.add.sprite(240,300,"player").setScale(0.3);


    }

    update(){

    }

}