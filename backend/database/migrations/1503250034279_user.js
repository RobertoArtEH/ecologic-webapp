'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 25).notNullable().unique()
      table.string('last_name', 25).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.integer('status', 1).notNullable().defaultTo(1)
      table.integer('role', 1).notNullable().defaultTo(0)
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
