import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shops extends BaseSchema {
  protected tableName = 'shops'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('street').notNullable()
      table.string('city').notNullable()
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.string('description')
      table.string('phone')
      table.boolean('is_bio').notNullable().defaultTo(false)
      table.boolean('is_productor').notNullable().defaultTo(false)
      table.boolean('accept_local_currency').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
