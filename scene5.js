class Scene5 extends Phaser.Scene{
    constructor() {
        super("highscores");
    }


    // takes starsCollected data from scene 3
    init(data){
        this.score = data.score;
    }

    create () {
        let score = this.score;
        postHighscores = async (pilotName = "player", score) => {
            try {
            const request = await fetch('https://web-dev-final-it3049c.s3.amazonaws.com/scores.json', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: pilotName, score }),
            });
            const response = await request.json();
            return response;
            } catch (err) {
            throw new Error('Unable to post Highscores! Please try again later!');
            }
        }
        
        fetchHighscores = async () => {
            const leaderboard = [];
            try {
            const request = await fetch('https://web-dev-final-it3049c.s3.amazonaws.com/scores.json', {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            });
            const response = await request.json();
            const data = response.result;
            data.forEach(entry => {
                leaderboard.push([entry.user, entry.score]);
            });
            return leaderboard;
            } catch (error) {
            throw new Error('Unable to fetch Highscores! Please try again later!');
            }
        };
        fetchHighscores().then(response => {
            response.sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map((game, i) => {
                const text = `${i + 1}. Pilot: ${game[0]} --- Score: ${game[1]}`;
                this.add.text(config.width / 2, (85 * (i + 1.1)) + 100, text, {
                    fontFamily: 'Visitor TT2 BRK',
                    fontSize: '48px',
                    color: '#00ff33',
                    align: 'center',
                    lineHeight: '1.5',
                }).setOrigin(0.5, 0.5);
                return text;
                });
            });
    }
        
      
}