class CityWeather {
  constructor() {
    this.lat = 0;
    this.lng = 0;
    this.city = "";
    this.weather = "";
    this.weatherData = "";
    this.cityData = "";
  }




  geolocation() {

    if (!navigator.geolocation) {
      console.log('geolocation not available');


    } else {
      var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }
      
      getPosition()
        .then((position) => {
          this.lat=position.coords.latitude;
          // console.log(this.lat);

          this.lng = position.coords.longitude;

          // console.log(this.lng);
        })
        .catch((err) => {
          console.error(err.message);
        });
        
        

    };
    
    
  }




  //fetch City
  fetchCity() {
    return fetch(

      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.lat}&longitude=${this.lng}}&localityLanguage=en`
    )
      .then((r) => r.json());
  }

  //fetch weather
  fetchWeather() {

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=4a3ff5b3af9fb104095dd2ae1f948987`)
      .then((r) => r.json());
    // return fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${this.lng}&lat=${this.lat}`,
    //   {
    //     "method": "GET",
    //     "headers": {
    //       "x-rapidapi-key": "2ed0ded61fmsh29fb2491e3cf7aap129be6jsnb0a344720d9a",
    //       "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
    //     }
    //   })
    //   .then((r) => r.json());
  }


  async getCityWeather(next) {
   
    this.geolocation();
    //Get JSON responses with City and Weather 
    this.cityData = await this.fetchCity();
    this.city = this.cityData.city;

    this.weatherData = await this.fetchWeather();
    console.log(this.weatherData);
    this.city = this.cityData.city;
    this.weather = this.weatherData.weather[0].description;



    next();
  }
}
