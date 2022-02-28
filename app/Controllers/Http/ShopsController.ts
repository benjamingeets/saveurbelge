// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from "App/Models/Shop"
import CreateShopValidator from "App/Validators/CreateShopValidator"

export default class ShopsController {
    public showMap({view}){
        return view.render('index')
    }
    public async getShops(){
        const shops = await Shop.all()
        return shops
    }
    public showAddShop({view}){
        return view.render('form')
    }
    public async createShop({request}){
        const payload = await request.validate(CreateShopValidator)
        if(payload.logo){
            await payload.logo.moveToDisk('./')
            payload.logo = payload.logo.fileName
        }
        Shop.create(payload)
        return "ok"
    }
    public async showShop({view,params}){
        const shop = await Shop.findByOrFail('slug',params.slug)
        return view.render('shop',{shop})
    }
}
