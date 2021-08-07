class Scene4 extends Phaser.Scene{
    constructor() {
        super("gameOver");
    }

    create(){
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Game Over \n Score: ', {
            fonstSize: 24

        })
        .setOrigin(0.5); // sets text to middle of screen

        this.add.text(this.scale.width *0.5, this.scale.height * 0.55, 'Press SPACE to restart', {
            fontSize: 18
        })
        .setOrigin(0.5);

        // restart on game over
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('playGame');
        })
    }

}