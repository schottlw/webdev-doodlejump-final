class Scene1 extends Phaser.Scene {
    constructor() {
    super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/images/background.jpg");
        this.load.image("platform", "assets/images/platform.png");
        this.load.image("player", "assets/images/player.png");
    }

    create(){
        this.scene.start("playGame");

    }

}