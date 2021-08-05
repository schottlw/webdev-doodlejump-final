class Scene1 extends Phaser.Scene {
    constructor() {
    super("bootGame");

    }

     preload(){
        this.load.image("background", "assets/images/background.jpg");
        this.load.image("platform", "assets/images/platform.png");
        this.load.image("player", "assets/images/player.png");
        this.load.image("rain", "assets/images/rain.png");


        
        
        
    }

      create(){
        this.scene.start("weatherLoad");
        this.scene.start("playGame");
    }

}