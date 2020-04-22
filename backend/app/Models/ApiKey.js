'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ApiKey extends Model {
  static get table () {
    return 'api_keys'
  }
}

module.exports = ApiKey
