import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectIfAuth {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(auth.isLoggedIn){
      response.redirect().toPath("/dashboard")
    }
    await next()
  }
}
