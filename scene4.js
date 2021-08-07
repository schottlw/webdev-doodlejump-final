class Scene4 extends Phaser.Scene{
    constructor() {
        super("gameOver");
    }

    create(){
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Game Over \n Score: ', {
            fonstSize: 50
        })
        .setOrigin(0.5); // sets text to middle of screen
    }

}