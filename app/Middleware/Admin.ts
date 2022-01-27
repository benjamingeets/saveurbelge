import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(auth.user.status >= 5){
      await next()
    }
    else{
      response.redirect().toPath("/")
    }
    
  }
}
