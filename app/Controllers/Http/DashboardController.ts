// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from "App/Models/Shop"
import User from "App/Models/User"

export default class DashboardController {
    public async showDashboard({view,request}){
        return view.render('dashboard/index',{shops:request.all().shops})
    }
    public async showShop({view,params,request}){
        const id = params.id
        const selectedShop = await Shop.findOrFail(id)
        return view.render('dashboard/shop',{selectedShop,shops:request.all().shops})
    }
    public async showAddShop({view,request}){
        return view.render('dashboard/create-shop',{shops:request.all().shops})
    }
    public async showAccount({view,auth,request}){
        const user = await User.findOrFail(auth.user.id)
        return view.render('dashboard/account',{user,shops:request.all().shops})
    }
}
