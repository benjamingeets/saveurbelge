// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category"
import Sector from "App/Models/Sector"
import Shop from "App/Models/Shop"
import User from "App/Models/User"
import EditShopValidator from "App/Validators/EditShopValidator"
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class DashboardController {
    public async showDashboard({ view, request,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/index', { shops: shops })
    }
    public async showShop({ view, params, request,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)

        const id = params.id
        const selectedShop = await Shop.findOrFail(id)
        const categories = await Category.query().select('name').whereIn('id', selectedShop.categories)
        const sector = await Sector.findOrFail(selectedShop.sector)
        return view.render('dashboard/shop', { selectedShop, shops, categories, sector })
    }
    public async showShopEditInformations({ view, params, request,auth }) {
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
            try {
                await logo.move(Application.tmpPath('uploads/'))
                const binary = fs.readFileSync(`${Application.tmpPath('uploads')}/${logo.clientName}`, 'base64')
                shop.logo = `data:image/${logo.subtype};base64, ${binary}`
                await shop.save()
                fs.unlinkSync(`${Application.tmpPath('uploads')}/${logo.clientName}`)
            } catch (e) {
                console.log(e)
            }
        }
        return response.redirect().toRoute('DashboardController.showShop', { id })
    }
    public async showDeleteShop({ params, response, view }) {
        return view.renderRaw(`
            <h2>Attention</h2>
            <p>Êtes-vous certain de vouloir supprimer votre commerce?<p>
            <form action="{{route('DashboardController.deleteShop',{id:id})}}" method="post">
            {{ csrfField() }}
            <input type="submit" value="Supprimer">
            </form>
        `, { id: params.id })
    }
    public async deleteShop({ params, response }) {
        const id = params.id
        const shop = await Shop.firstOrFail(id)
        console.log(shop)
        try {
            await shop.delete()
        } catch (e) {
            console.log(e)
        }
        return "finito"
    }
    public async showAddShop({ view, request,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/create-shop', { shops })
    }
    public async showAccount({ view, auth, request }) {
        const user = await User.findOrFail(auth.user.id)
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/account', { user, shops })
    }
}
