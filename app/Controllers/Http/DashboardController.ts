// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category"
import Sector from "App/Models/Sector"
import Shop from "App/Models/Shop"
import User from "App/Models/User"
import CreateShopValidator from "App/Validators/CreateShopValidator"
import EditAccountValidator from "App/Validators/EditAccountValidator"
import EditPasswordValidator from "App/Validators/EditPasswordValidator"
import EditShopValidator from "App/Validators/EditShopValidator"

export default class DashboardController {
    public async showDashboard({ view,auth,response }) {
        try {
            const shops = await Shop.findByOrFail('ownerId',auth.user.id)
        if(shops){
            response.redirect().toRoute('DashboardController.showShop',{id:shops.id})
        }
        } catch (error) {
            
        }
        return view.render('dashboard/index')
    }
    public async showShop({ view, params,auth }) {
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        const id = params.id
        const selectedShop = await Shop.query().where('shops.id',id).join('sectors', 'shops.sector', '=', 'sectors.id').select('shops.*','sectors.name as sector','categories')
        const categories = await Category.query().select('*').whereIn('id', selectedShop[0].categories)
        return view.render('dashboard/shop', { selectedShop:selectedShop[0], shops, categories })
    }
    public async showShopEdit({view,params,}){
        const shop = await Shop.findOrFail(params.id)
        const categories = await Category.query().select('*').where('sector',shop.sector)
        return view.render('dashboard/edit-shop', { selectedShop:shop, categories })
    }
    public async editShop({ params, request, response,bouncer }) {
        const id = params.id
        const logo = request.file('logo')
        const shop = await Shop.findOrFail(id)
        await bouncer.authorize('editShop',shop)
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
        return view.render('dashboard/delete-shop', { id: params.id })
    }
    public async deleteShop({ params,response,bouncer }) {
        const id = params.id
        const shop = await Shop.findOrFail(id)
        await bouncer.authorize('editShop',shop)
        try {
            await shop.delete()
        } catch (e) {
            console.log(e)
        }
        return response.redirect().toRoute('DashboardController.showDashboard')
    }
    public async showAddShop({ view,auth }) {
        if(auth.user.status == 0){
            return "Votre compte n'est pas validé"
        }
        const sectors = await Sector.all()
        const categories = await Category.query().select('*').where('sector',sectors[0].id)
        return view.render('dashboard/create-shop', {sectors,categories ,hideAside:true })
    }
    public async createShop({request,auth,response}){
        const logo = request.file('logo')
        const payload = await request.validate(CreateShopValidator)
        payload.ownerId = auth.user.id
        const shop = await Shop.create(payload)
        if (logo) {
            await logo.moveToDisk('./')
            shop.logo = logo.fileName
            await shop.save()
        }
        return response.redirect().toRoute('DashboardController.showDashboard')
    }
    public async showAccount({ view, auth }) {
        const user = await User.findOrFail(auth.user.id)
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        return view.render('dashboard/account', { user, shops })
    }
    public async showEditAccount({view}){
        return view.render('dashboard/modals/edit-account',{hideAside:true})
    }
    public async editAccount({request,response,auth}){
        const payload = await request.validate(EditAccountValidator)
        const user = await User.findOrFail(auth.user.id)
        await user.merge(payload).save()
        return response.redirect().toRoute('DashboardController.showAccount')
    }
    public async showDeleteAccount({  view }) {
        return view.render('dashboard/delete-account')
    }
    public async deleteAccount({auth,response}){
        const user = await User.findOrFail(auth.user.id)
        const shops = await Shop.query().select('*').where('ownerId', auth.user.id)
        shops.forEach(async s=>{
            await s.delete()
        })
        await user.delete()
        await auth.logout()
        return response.redirect().toRoute('SearchesController.showSearchForm')
    }
    public async showEditPassword({view}){
        return view.render('dashboard/edit-password',{hideAside:true})
    }
    public async editPassword({request,auth}){
        const payload = await request.validate(EditPasswordValidator)
        const user = await User.findOrFail(auth.user.id)
        user.password = payload.password
        await user.save()
        return "oui"
    }
}
