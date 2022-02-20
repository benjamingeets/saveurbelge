// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from "App/Models/Category"
import Shop from "App/Models/Shop"

export default class SearchesController {
    public async showSearchForm({view}){
        return view.render('homepage')
    }
    public async getShops({}){
        const shops = await Shop.query().join('sectors', 'shops.sector', '=', 'sectors.id').select('shops.name','slug','logo','latitude','longitude','sectors.name as sector','categories')
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