import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import mjml from 'mjml'
export default class ForgotPassword extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
   constructor(private user: User, private url: string) {
    super()
  }
  public async prepare(message: MessageContract) {
    const html = mjml(
      await View.render('emails/forgotpassword', { user: this.user, url: this.url })
    ).html

    message
      .subject('Réinitialisation de votre mot de passe')
      .from('no-reply@saveurbelge.be')
      .to(this.user.email)
      .html(html)
  }
}
