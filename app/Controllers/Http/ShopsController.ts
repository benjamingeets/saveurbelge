// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from "App/Models/Shop"
import CreateShopValidator from "App/Validators/CreateShopValidator"

export default class ShopsController {
    public showMap({view,request}){
        return view.render('index')
    }
    public async getShops(){
        const shops = await Shop.all()
        return shops
    }
    public showAddShop({view}){
        return view.render('form')
    }
    public async createShop({request,response}){
        const payload = await request.validate(CreateShopValidator)
        payload.ip = request.ip()
        if(payload.logo){
            await payload.logo.moveToDisk('./')
            payload.logo = payload.logo.fileName
        }
        const shop = await Shop.create(payload)
        return response.redirect().toRoute('ShopsController.showShop',{slug:shop.slug})
    }
    public async showShop({view,params}){
        const shop = await Shop.findByOrFail('slug',params.slug)
        return view.render('shop',{shop})
    }
}
