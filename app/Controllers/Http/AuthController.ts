// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VerifyEmail from "App/Mailers/VerifyEmail"
import User from "App/Models/User"
import RegisterValidator from "App/Validators/RegisterValidator"
import Route from '@ioc:Adonis/Core/Route'
import ForgotPassword from "App/Mailers/ForgotPassword"
export default class AuthController {
    public async showLoginForm({ view }) {
        return view.render("auth/login")
    }
    public async login({ auth, request, response }) {
        const { email, password } = request.only(["email", "password"])
        await auth.attempt(email, password)
        response.redirect().toRoute('DashboardController.showDashboard')
    }

    public async logout({ auth, response }) {
        await auth.logout()
        response.redirect().toRoute('AuthController.showLoginForm')
    }

    public async showRegisterForm({ view }) {
        return view.render("auth/register")
    }
    public async register({ auth, request, response }) {
        const payload = await request.validate(RegisterValidator)
        const user = await User.create(payload)
        await auth.login(user)
        const url = Route.makeSignedUrl(
            'AuthController.validateUser',
            {
                id: user.id,
            },
            { expiresIn: '1h' }
        )
        new VerifyEmail(user, `${`http://localhost:3333`}${url}`).sendLater()

        return response.redirect().toPath("/")
    }
    public async validateUser({ auth, params, request, response, session }) {
        if (!request.hasValidSignature()) {
            session.flash('error', `Ce lien n'est pas valide`)
            return response.redirect().toPath('/')
        }

        const id = params.id
        const user = await User.findOrFail(id)
        user.status = 1
        await user.save()
        await auth.login(user)

        return response.redirect('/')
    }

    public async showForgotPassword({ view }) {
        return view.render("auth/forgotpassword")
    }

    public async resetPassword({ auth, params, request, response, session }) {
        if (!request.hasValidSignature()) {
            session.flash('error', `Ce lien n'est pas valide`)
            return response.redirect().toPath('/')
        }
        const id = params.id
        const user = await User.findByOrFail('id',id)
        const {password}=request.only(["password"])
        user.password = password
        await user.save()
        await auth.login(user)
        response.redirect().toPath("/")
    }

    public async showResetPassword({view,request,session,response,params}){
        if (!request.hasValidSignature()) {
            session.flash('error', `Ce lien n'est pas valide`)
            return response.redirect().toPath('/')
        }
        
        const id = params.id
        const url = Route.makeSignedUrl(
            'AuthController.resetPassword',
            {
                id: id,
            },
            { expiresIn: '1h' }
        )
        return view.render('auth/resetpassword',{url:url})
    }

    public async forgotPassword({ request }) {
        const { email } = request.only(["email"])
        const user = await User.findByOrFail('email', email)
        const url = Route.makeSignedUrl(
            'AuthController.showResetPassword',
            {
                id: user.id,
            },
            { expiresIn: '1h' }
        )
        new ForgotPassword(user, `${`http://localhost:3333`}${url}`).sendLater()

        return "Votre demande a bien été reçue."
    }
}
