class Scene5 extends Phaser.Scene{
    constructor() {
        super("highscores");
    }

    create () {
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.1, 'Highscores:', {
            fonstSize: 72,
            color: '#FF0000'
        })
        .setOrigin(0.5); // sets text to middle of screen

        this.add.text(this.scale.width * 0.23, this.scale.height * 0.2, 'Rank:', {
            fonstSize: 24,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        this.add.text(this.scale.width *0.5, this.scale.height * 0.2, 'Name:', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        this.add.text(this.scale.width *0.77, this.scale.height * 0.2, 'Stars:', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        this.add.text(this.scale.width *0.5, this.scale.height * 0.90, 'Press SPACE to restart', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);


        // restart on game over
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('playGame');
        })

    }
    
      
}