import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shops extends BaseSchema {
  protected tableName = 'shops'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.string('owner_id').notNullable()
      table.binary('logo')
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.string('description').notNullable()
      table.string('sector').notNullable()
      table.json('categories').notNullable().defaultTo('[]')
      table.string('address_number').notNullable()
      table.string('address_street').notNullable()
      table.string('address_postcode').notNullable()
      table.string('address_city').notNullable()
      table.string('phone')
      table.boolean('option_is_productor').defaultTo(false)
      table.boolean('option_is_bio').defaultTo(false)
      table.boolean('option_accept_local_currency').defaultTo(false)
      table.string('instagram_username')
      table.string('facebook_username')
      table.string('website_url')
      table.integer('status').defaultTo(1)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
