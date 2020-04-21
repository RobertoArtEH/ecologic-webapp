'use strict'
const admin = require('firebase-admin')

const serviceAccount = require('../../../ecologic-center-firebase-adminsdk-9ip96.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecologic-center.firebaseio.com/'
});

const db = admin.database();

class FirebaseController {
  sensors() {
    return db.ref('Sensores').limitToLast(1).once('value', snapshot => {
      return snapshot.val();
    });
  }

  waterLog() {
    return db.ref('Riegos').once('value', snapshot => {
      return snapshot.val();
    });
  }
  
  lastWaterLog() {
    return db.ref('Riegos').limitToLast(1).once('value', snapshot => {
      return snapshot.val();
    });
  }

  async registerWater({ request, auth }) {
    const { fecha, hora, humedad } = request.all();

    const user = await auth.user;
    const miembro = user.name + ' ' + user.last_name;

    const Riegos = { fecha, hora , humedad, miembro };

    db.ref('Riegos').push(Riegos);
  }

  lastSensors() {
    return db.ref('Sensores').limitToLast(6).once('value', snapshot => {
      return snapshot.val();
    });
  }

}

module.exports = FirebaseController
