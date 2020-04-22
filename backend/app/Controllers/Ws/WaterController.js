'use strict'

class WaterController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onWater(data) {
    this.socket.broadcast("value", data);
    console.log(data);
  }
}

module.exports = WaterController
