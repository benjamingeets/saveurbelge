import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shop from 'App/Models/Shop'

export default class DoOwnShop {
  public async handle({ auth, response, params, request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (auth.user) {
      request.all().shops = await Shop.query().select('*').where('ownerId', auth.user.id)
      if (params.id) {
        const requestedShop = await Shop.findOrFail(params.id)
        if (requestedShop.ownerId == auth.user.id) {
          await next()
        } else {
          response.redirect().toRoute('AuthController.showLoginForm')
        }
      }
      await next()
    }
  }
}
