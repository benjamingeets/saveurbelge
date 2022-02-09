// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category"
import Sector from "App/Models/Sector"
import Shop from "App/Models/Shop"
import User from "App/Models/User"
import EditShopValidator from "App/Validators/EditShopValidator"

export default class DashboardController {
    public async showDashboard({ view,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/index', { shops: shops })
    }
    public async showShop({ view, params,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)

        const id = params.id
        const selectedShop = await Shop.query().where('shops.id',id).join('sectors', 'shops.sector', '=', 'sectors.id').select('shops.*','sectors.name as sector','categories')
        const categories = await Category.query().select('name').whereIn('id', selectedShop[0].categories)
        console.log(selectedShop[0].categories)
        return view.render('dashboard/shop', { selectedShop:selectedShop[0], shops, categories })
    }
    public async showShopEditInformations({ view, params,auth }) {
        const shop = await Shop.findOrFail(params.id)
        const categories = await Category.all()
        const sectors = await Sector.all()
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/edit-informations', { shop, shops, categories, sectors })
    }
    public async editShop({ params, request, response }) {
        const id = params.id
        const logo = request.file('logo')
        const shop = await Shop.findOrFail(id)
        const payload = await request.validate(EditShopValidator)
        await shop.merge(payload).save()
        if (logo) {
            await logo.moveToDisk('./')
            shop.logo = logo.fileName
            await shop.save()
        }
        return response.redirect().toRoute('DashboardController.showShop', { id })
    }
    public async showDeleteShop({ params, view }) {
        return view.renderRaw(`
            <h2>Attention</h2>
            <p>Êtes-vous certain de vouloir supprimer votre commerce?<p>
            <form action="{{route('DashboardController.deleteShop',{id:id})}}" method="post">
            {{ csrfField() }}
            <input type="submit" value="Supprimer">
            </form>
        `, { id: params.id })
    }
    public async deleteShop({ params }) {
        const id = params.id
        const shop = await Shop.firstOrFail(id)
        try {
            await shop.delete()
        } catch (e) {
            console.log(e)
        }
        return "finito"
    }
    public async showAddShop({ view,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/create-shop', { shops })
    }
    public async showAccount({ view, auth }) {
        const user = await User.findOrFail(auth.user.id)
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/account', { user, shops })
    }
}
