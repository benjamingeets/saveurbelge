// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from "App/Models/Shop"
import User from "App/Models/User"

export default class DashboardController {
    public async showDashboard({view,auth}){
        const shops = await Shop.query().select('*').where('ownerId',auth.user.id)
        return view.render('dashboard/index',{shops})
    }
    public async showShop({view,params}){
        const id = params.id
        const shop = await Shop.findOrFail(id)
        return view.render('dashboard/shop',{shop})
    }
    public async showAddShop({view}){
        return view.render('dashboard/create-shop')
    }
    public async showAccount({view,auth}){
        const user = await User.findOrFail(auth.user.id)
        return view.render('dashboard/account',{user})
    }
}
