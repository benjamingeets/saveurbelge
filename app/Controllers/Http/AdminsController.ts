// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import RegisterValidator from "App/Validators/RegisterValidator"
import Sector from "App/Models/Sector"
import Category from "App/Models/Category"
import Database from "@ioc:Adonis/Lucid/Database"
export default class AdminsController {
    public async showDashboard({ view }) {
        const users = await User.all()
        return view.render("admin/dashboard", { infos: { users: users.length } })
    }
    public async showUsers({ view }) {
        return view.render("admin/users", { users:await Database.from('users').select('*').orderBy('updated_at', 'desc') })
    }
    public async showCreateUser({ view }) {
        return view.render("admin/create-user")
    }
    public async createUser({ request, response }) {
        const payload = await request.validate(RegisterValidator)
        await User.create(payload)
        response.redirect().toRoute('AdminsController.showUsers')
    }
    public async deleteUser({ response, params }) {
        const id = params.id
        const user = await User.findByOrFail('id', id)
        await user.delete()
        response.redirect().toRoute('AdminsController.showUsers')
    }
    public async showEditUser({ view, params }) {
        const id = params.id
        const user = await User.findByOrFail('id', id)
        return view.render('admin/edit-user', { user: user })
    }
    public async editUser({ request, params, response }) {
        const id = params.id
        const { email, password, firstName, lastName, status } = request.only(['email', 'password', 'firstName', 'lastName', 'status'])
        const user = await User.findByOrFail('id', id)
        user.email = email
        user.firstName = firstName
        user.lastName = lastName
        if(user.status != 5){
            user.status = status
        }
        if(password){
            user.password = password
        }
        await user.save()
        response.redirect().toRoute('AdminsController.showUsers')
    }
    public async showShops({ view }) {
        return view.render("admin/dashboard", { infos: { users: 0 } })
    }
    public async showSectorsAndCategories({ view }) {
        const categories = await Category.all()
        const sectors = await Sector.all()
        return view.render("admin/sectors-and-categories", {categories,sectors})
    }
    public async showEditCategory({view,params}){
        const id = params.id
        const category = await Category.findOrFail(id)
        return view.render('admin/edit-category',{category})
    }

    public async editCategory({params,request,response}){
        const id = params.id
        const {name} = request.only(["name"])
        const category = await Category.findOrFail(id)
        category.name = name
        await category.save()
        response.redirect().toRoute('AdminsController.showSectorsAndCategories')
    }

    public async showEditSector({view,params}){
        const id = params.id
        const sector = await Sector.findOrFail(id)
        return view.render('admin/edit-sector',{sector})
    }
    public async editSector({params,request,response}){
        const id = params.id
        const {name} = request.only(["name"])
        const sector = await Sector.findOrFail(id)
        sector.name = name
        await sector.save()
        response.redirect().toRoute('AdminsController.showSectorsAndCategories')
    }
    public async createSector({request,response}){
        const {sector} = request.only(['sector'])
        await Sector.create({name:sector})
        response.redirect().toRoute('AdminsController.showSectorsAndCategories')
    }
    public async createCategory({request,response}){
        const {category,sectorId} = request.only(["category","sectorId"])
        await Category.create({name:category,sector:sectorId})
        response.redirect().toRoute('AdminsController.showSectorsAndCategories')
    }
    public async deleteSector({params,response}){
        const id = params.id
        const sector = await Sector.findOrFail(id)
        await sector.delete()
        response.redirect().toRoute('AdminsController.showSectorsAndCategories')
    }
}
