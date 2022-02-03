import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditShopValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name:schema.string.optional({trim:true}),
    description:schema.string({trim:true}),
    addressNumber:schema.string.optional({trim:true}),
    addressStreet:schema.string.optional({trim:true}),
    addressCity:schema.string.optional({trim:true}),
    addressPostcode:schema.string.optional({trim:true}),
    phone:schema.string.nullableAndOptional({trim:true}),
    optionIsBio:schema.boolean.nullableAndOptional(),
    optionAcceptLocalCurrency:schema.boolean.nullableAndOptional(),
    optionIsProductor:schema.boolean.nullableAndOptional(),
    instagramUsername:schema.string.nullableAndOptional(),
    facebookUsername:schema.string.nullableAndOptional(),
    websiteUrl:schema.string.nullableAndOptional({},[rules.url()]),
    categories:schema.array.nullableAndOptional().members(schema.string()),
    sector:schema.string.optional()
  })


  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
