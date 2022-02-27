// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShopsController {
    public showMap({view}){
        return view.render('index')
    }
    public getShops(){
        return []
    }
    public showAddShop({view}){
        return view.render('form')
    }
    public createShop({view,request}){
        console.log(request.all())
        return "ok"
    }
}
