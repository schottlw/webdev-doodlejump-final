class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");

  }

  preload() {
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("star", "assets/images/star.png");
    this.load.spritesheet('player', 'assets/spriteSheets/player.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image("rain", "assets/images/rain.png");

  }

  create() {
    this.scene.start("weatherLoad");
    this.scene.start("playGame");

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

}