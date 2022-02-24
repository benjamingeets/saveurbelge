// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
import Category from "App/Models/Category"
import Sector from "App/Models/Sector"
import Shop from "App/Models/Shop"

export default class SearchesController {
    public async showSearchForm({view}){
        const categories = await Category.all()
        const sectors = await Sector.all()
        return view.render('homepage',{sectors,categories})
    }
    public async getShops({request}){
        if(request.qs().categories){
            const categories = await JSON.parse(request.qs().categories)
            console.log(categories)
        }
        const shops = await Database.from('shops').join('sectors', 'shops.sector', '=', 'sectors.id').select('shops.name','slug','logo','latitude','longitude','address_city','categories','sectors.*','sectors.name')
        return shops
    }
    public async showShop({view,params}){
        const slug = params.slug
        const shop = await Shop.query().where('shops.slug',slug).join('sectors', 'shops.sector', '=', 'sectors.id').select('shops.*','sectors.name as sector','categories')
        const allCategories = await Category.all()
        let list: Array<string> = []
        shop[0].categories.forEach(c=>{
            const a = allCategories.filter(aC=>{
                return c == aC.id
            })
            list.push(a[0].name)
        })
        return view.render('public/shop',{shop:shop[0],categories:list})
    }
}