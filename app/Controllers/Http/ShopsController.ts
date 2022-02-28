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
    public async createShop({view,request}){
        const payload = await request.validate(CreateShopValidator)
        console.log(payload)
        if(payload.logo){
            payload.logo.moveToDisk('./')
        }
        const shop = Shop.create(payload)
        return "ok"
    }
    public async showShop({view,params}){
        return params.slug
    }
}
