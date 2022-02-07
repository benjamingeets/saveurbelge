// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from "App/Models/Shop"

export default class SearchesController {
    public async showSearchForm({view}){
        return view.render('homepage')
    }
    public async getShops({}){
        const shops = await Shop.query().select('name','slug','logo','latitude','longitude','sector','categories')
        return shops
    }
}