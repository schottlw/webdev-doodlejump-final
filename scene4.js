class Scene4 extends Phaser.Scene{
    constructor() {
        super("gameOver");
    }

    // takes starsCollected data from scene 3
    init(data){
        this.score = data.score;
    }

    create(){
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Game Over', {
            fonstSize: 24,
            color: '#FF0000'
        })
        .setOrigin(0.5); // sets text to middle of screen

        this.add.text(this.scale.width * 0.5, this.scale.height * 0.53, 'Stars: ' + this.score, {
            fonstSize: 24,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        this.add.text(this.scale.width *0.5, this.scale.height * 0.56, 'Press SPACE to restart', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        this.add.text(this.scale.width *0.5, this.scale.height * 0.59, 'Press ENTER for Highscores', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        // restart on game over
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('playGame');
        })

        // takes to the leaderboard
        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.start('highscores');
        })
    }

}