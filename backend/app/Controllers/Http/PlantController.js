'use strict'

const fetch = use("node-fetch");
const ApiKey = use('App/Models/ApiKey');

class PlantController {
  async water({ request, response }) {
    const { time } = request.all();
    
    try {
      const key = await ApiKey.query().where('api', 'adafruit').first();

      if(time == 10) {
        const body = { value: 'ON' };

        return fetch('https://io.adafruit.com/api/v2/Cesar_utt/feeds/bomba/data', {
          headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': key.token
          },
          method: 'POST',
          body: JSON.stringify(body)
        })
        .then(() => {
          return response.status(200).json({ message: '¡La planta se empezara a regar en breve!' });
        })
        .catch(() => {
          return response.status(400).json({ error: 'Ha ocurrido un error, intentalo de nuevo.' });
        });
      } else {
        const body = { value: time };

        return fetch('https://io.adafruit.com/api/v2/Cesar_utt/feeds/bombatiempo/data', {
          headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': key.token
          },
          method: 'POST',
          body: JSON.stringify(body)
        })
        .then(() => {
          return response.status(200).json({ message: '¡La planta se empezara a regar en breve!' });
        })
        .catch(() => {
          return response.status(400).json({ error: 'Ha ocurrido un error, intentalo de nuevo.' });
        });
      }
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

module.exports = PlantController
