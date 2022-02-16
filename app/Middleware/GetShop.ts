import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shop from 'App/Models/Shop'

export default class GetShop {
  public async handle({auth,request}: HttpContextContract, next: () => Promise<void>) {
    if(auth.user){
      request.all().shops = await Shop.query().select('*').where('ownerId', auth.user.id)
      await next()
    }
  }
}
