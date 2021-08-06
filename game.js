let config = {
    width: 500,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, Scene3],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

// Creates new instance of Phaser Game
    let game = new Phaser.Game(config);

