'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApiKeysSchema extends Schema {
  up () {
    this.create('api_keys', (table) => {
      table.string('api', 25).notNullable().unique()
      table.string('token', 100).nullable().unique().defaultTo(null)
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('api_keys')
  }
}

module.exports = ApiKeysSchema
