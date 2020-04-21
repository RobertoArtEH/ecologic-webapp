'use strict'

const fetch = use("node-fetch");

class PlantController {
  water({ request, response }) {
    const { time } = request.all();

    try {
      if(time == 10) {
        const body = { value: 'ON' };

        return fetch('https://io.adafruit.com/api/v2/Cesar_utt/feeds/bomba/data', {
          headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': '05037193ee4a460eb2e5ba8bc1e91a45'
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
            'X-AIO-Key': '05037193ee4a460eb2e5ba8bc1e91a45'
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
