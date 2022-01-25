import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
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
    email:schema.string({trim:true},[
      rules.email(),
      rules.unique({table:'users',column:'email'})
    ]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
    firstName:schema.string({trim:true}),
    lastName:schema.string({trim:true})
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
  public messages = {
    'email.required': `L'email est requis`,
    'email.email': `L'email n'est pas valide`,
    'email.unique': `Cet email est déjà utilisé`,
    'password.required': `Le mot de passe est requis`,
    'password_confirmation.confirmed': `Les mots de passe ne correspondent pas`,
    'password.minLength': `Le mot de passe doit contenir au moins 6 caractères`,
  }
}
