class Scene5 extends Phaser.Scene{
    constructor() {
        super("highscores");
    }

    // takes starsCollected data from scene 3
    init(data){
        this.score = data.score,
        this.username = data.username;
    }

     async create(){
         
        try {
            if (this.player.username && this.player.score) {
                await fetch("http://localhost:3000/create", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify(this.player)
                });
            }

            this.globalScores = await fetch("http://localhost:3000/get")
                .then(response => response.json());
            
        } catch (e) {
            console.error(e);
        }

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

        this.add.text(this.scale.width *0.5, this.scale.height * 0.25, 'Name:', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        this.add.text(this.scale.width *0.77, this.scale.height * 0.2, 'Stars:', {
            fontSize: 18,
            color: '#FF0000'
        })
        .setOrigin(0.5);

        for(let i = 0; i <this.globalScores.length; i++) {
            this.add.text(this.scale.width *0.5, this.scale.height * 0.25, '${this.globalScores[i].username}: ', {
                fontSize: 18,
                color: '#FF0000'
            })
            .setOrigin(0.5);
    
            this.add.text(this.scale.width *0.77, this.scale.height * 0.25, '${this.globalScores[i].score}: ', {
                fontSize: 18,
                color: '#FF0000'
            })
            .setOrigin(0.5);
        }
        

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