import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('first_name',150).notNullable()
      table.string('last_name',150).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('status').notNullable().defaultTo(0) //0 = pending, 1 = active, 5 = admin, -1 = banned

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
