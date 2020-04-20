'use strict'
const admin = require('firebase-admin')

const serviceAccount = require('../../../ecologic-center-firebase-adminsdk-9ip96-d5bffc74ed.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecologic-center.firebaseio.com/'
});

const db = admin.database();

class FirebaseController {
  registerWater({ request }) {
    const { fecha, hora, humedad , miembro } = request.all();

    const Riegos = { fecha, hora , humedad, miembro };

    db.ref('Riegos').push(Riegos);
  }

  waterlog() {
    return db.ref('Riegos').once('value', snapshot => {
      return snapshot.val();
    })
  }

}

module.exports = FirebaseController
