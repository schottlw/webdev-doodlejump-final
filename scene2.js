class Scene2 extends Phaser.Scene {
    constructor() {
        super("weatherLoad");
        this.weather;
        this.city;
    }

  async create() {

    this.usernameInput = this.add.dom(640, 360).createFromCache("form");
    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.returnKey.on("down", event => {
        let username = this.usernameInput.getChildByName("username");
        if(username.value != "") {
            this.scene.start("playgame");
        }
    })

    var that = this; 
    var currentWeather = new CityWeather();
    await currentWeather.getCityWeather(function () {
        that.weather = currentWeather.weather;
        that.city = currentWeather.city;

    });

    console.log("weather: " + this.weather);
    console.log("City: " + this.city);

    


    if (this.weather.match(/cloud.*/))
     {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "cloud");
        this.background.setOrigin(0, 0);

    }
    
    else if ((this.weather.match(/clear.*/ )) || (this.weather.match(/sun.*/ )))
     {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "clear");
        this.background.setOrigin(0, 0);

    }
    else if (this.weather.match(/rain.*/ ))
     {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "rain");
        this.background.setOrigin(0, 0);

    }
    else{

        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
    }
   

    //display user's current city and weather 
    this.cityText = this.add.text(5, 5, 'city:'+this.city, { fontSize: '15px', fill: '#800813' });
    this.weatherText = this.add.text(5, 20, 'Weather:'+this.weather, { fontSize: '15px', fill: '#800813' });


    }
}

 