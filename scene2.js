class Scene2 extends Phaser.Scene{
    constructor() {
        super("playGame");
    }

    create(){
    //background
    this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
    this.background.setOrigin(0,0);

    //platforms

    this.add.image(240, 320, "platform").setScale(0.2);
    }

    update(){

    }
}