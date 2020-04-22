'use strict'

const fetch = use("node-fetch");
const ApiKey = use('App/Models/ApiKey');

class WeatherController {
  async nextDays({ response }) {
    const key = await ApiKey.query().where('api', 'openweather').first();

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Torreon,MX&appid=${key.token}`)
    .then(data => {
      return data.json();
    })
    .then(info => {
      let weatherList = [];

      for(var i = 5; i < 45; i += 8) {
        const description = info.list[i].weather[0].description;
        const temperature = parseInt(info.list[i].main.temp - 273.15);

        weatherList.push({description, temperature});
      }

      return response.status(200).json(weatherList);      
    })
    .catch(error => {
      return response.status(400).json(error.message);
    });
  }
}

module.exports = WeatherController
