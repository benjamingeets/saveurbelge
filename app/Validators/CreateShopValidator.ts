import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateShopValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name:schema.string({trim:true}),
    email:schema.string({trim:true},[rules.email()]),
    city:schema.string({trim:true}),
    street:schema.string({trim:true}),
    phone:schema.string.nullableAndOptional({trim:true}),
    title:schema.string({trim:true}),
    isBio:schema.boolean.nullableAndOptional(),
    isProductor:schema.boolean.nullableAndOptional(),
    acceptLocalCurrency:schema.boolean.nullableAndOptional(),
    description:schema.string({trim:true}),
    facebook:schema.string.nullableAndOptional({trim:true}),
    instagram:schema.string.nullableAndOptional({trim:true}),
    website:schema.string.nullableAndOptional({},[rules.url()]),
    logo:schema.file.nullableAndOptional({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png', 'webp'],
    })
  })


  public messages = {
    'required':'Ce champs est requis',
    'url':'Veuillez entrer une adresse internet',
    'email':'Veuillez entrer une adresse email'
  }
}
