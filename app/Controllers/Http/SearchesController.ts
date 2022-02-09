// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shop from "App/Models/Shop"

export default class SearchesController {
    public async showSearchForm({view}){
        return view.render('homepage')
    }
    public async getShops({}){
        const shops = await Shop.query().join('sectors', 'shops.sector', '=', 'sectors.id').select('shops.name','slug','logo','latitude','longitude','sectors.name as sector','categories')
        return shops
    }
}