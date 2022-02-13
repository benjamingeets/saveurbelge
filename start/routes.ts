/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', "SearchesController.showSearchForm")
Route.get("/commerce/:slug", ({ request }) => {
  return request.params().slug
})

Route.get("/account-validation/:id", "AuthController.validateUser")
Route.get("/reinitialisation-mot-de-passe/:id", "AuthController.showResetPassword")
Route.get("/shops","SearchesController.getShops")

Route.post("/reinitialisation-mot-de-passe/:id", "AuthController.resetPassword")

Route.group(() => {
  Route.get("/connexion", "AuthController.showLoginForm")
  Route.post("/connexion", "AuthController.login")
  Route.get("/inscription", "AuthController.showRegisterForm")
  Route.post("/inscription", "AuthController.register")
  Route.get("/mot-de-passe-oublie", "AuthController.showForgotPassword")
  Route.post("/mot-de-passe-oublie", "AuthController.forgotPassword")
}).middleware("redirectIfAuth")

Route.get("/deconnexion", 'AuthController.logout')

Route.group(() => {
  Route.get("/","DashboardController.showDashboard")
  Route.get("/shop/add","DashboardController.showAddShop")
  Route.post("/shop/add","DashboardController.createShop")
  Route.get("/shop/:id","DashboardController.showShop")
  Route.get("/shop/:id/informations/edit","DashboardController.showShopEditInformations")
  Route.get("/shop/:id/links/edit","DashboardController.showShopEditLinks")
  Route.get("/shop/:id/options/edit","DashboardController.showShopEditOptions")
  Route.post("/shop/:id/edit","DashboardController.editShop")
  Route.get("/shop/:id/delete","DashboardController.showDeleteShop")
  Route.post("/shop/:id/delete","DashboardController.deleteShop")
  Route.group(()=>{
    Route.get("/","DashboardController.showAccount")
    Route.get("/delete","DashboardController.showDeleteAccount")
    Route.post("/delete","DashboardController.deleteAccount")
    Route.get("/edit","DashboardController.showEditAccount")
    Route.post("/edit","DashboardController.editAccount")
    Route.get("/edit/password","DashboardController.showEditPassword")
    Route.post("/edit/password","DashboardController.editPassword")
  }).prefix("/account")
}).prefix("/dashboard").middleware("auth")

Route.group(() => {
  Route.get("/", "AdminsController.showDashboard")
  Route.get("/sectors-and-categories", "AdminsController.showSectorsAndCategories")
  Route.group(() => {
    Route.get("/", "AdminsController.showUsers")
    Route.get("/add", "AdminsController.showCreateUser")
    Route.post("/add", "AdminsController.createUser")
    Route.post("/:id/delete", "AdminsController.deleteUser")
    Route.get("/:id/edit", 'AdminsController.showEditUser')
    Route.post("/:id/edit", 'AdminsController.editUser')
  }).prefix("/users")
  Route.group(() => {
    Route.get("/:id/edit", "AdminsController.showEditSector")
    Route.post("/:id/edit", "AdminsController.editSector")
    Route.post("/add", "AdminsController.createSector")
    Route.post("/:id/delete", "AdminsController.deleteSector")
  }).prefix("/sector")
  Route.group(() => {
    Route.get("/:id/edit", "AdminsController.showEditCategory")
    Route.post("/:id/edit", "AdminsController.editCategory")
    Route.post("/add", "AdminsController.createCategory")
  }).prefix("/category")
  Route.group(()=>{
    Route.get("/", "AdminsController.showShops")
    Route.get('/:id/edit',"AdminsController.showEditShop")
    Route.post('/:id/edit',"AdminsController.editShop")
    Route.get('/add','AdminsController.showCreateShop')
    Route.post('/add','AdminsController.createShop')
    Route.post('/:id/delete','AdminsController.deleteShop')
  }).prefix("/shops")
}).prefix("/admin").middleware("auth").middleware("admin")

Route.get('/get-categories/:id','AdminsController.getCategories')