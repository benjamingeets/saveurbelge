// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchesController {
    public async showSearchForm({view}){
        return view.render('homepage')
    }
}
