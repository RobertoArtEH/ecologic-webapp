'use strict'
const admin = require('firebase-admin')

const serviceAccount = require('../../../ecologic-center-firebase-adminsdk-9ip96-2e16028fc6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecologic-center.firebaseio.com/'
});

const db = admin.database();

class FirebaseController {
  test({ request }) {
    const { member, humidity, date, time } = request.all();

    const waterLog = { member, humidity, date, time };

    db.ref('water-log').push(waterLog);
  }

  waterLog() {
    return db.ref('water-log').once('value', snapshot => {
      return snapshot.val();
    })
  }
}

module.exports = FirebaseController
