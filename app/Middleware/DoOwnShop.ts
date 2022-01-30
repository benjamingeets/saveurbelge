import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shop from 'App/Models/Shop'

export default class DoOwnShop {
  public async handle({auth,response,params}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    
    if(params.id && auth.user){
      const requestedShop = await Shop.findOrFail(params.id)
      if(requestedShop.ownerId == auth.user.id){
        await next()
      }else{
        response.redirect().toRoute('AuthController.showLoginForm')
      }
    }
    await next()
  }
}
