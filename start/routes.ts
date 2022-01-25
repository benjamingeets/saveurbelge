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

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get("/commerce/:slug",({request})=>{
  return request.params().slug
})

Route.get("/account-validation/:id","AuthController.validateUser")
Route.get("/reinitialisation-mot-de-passe/:id","AuthController.showResetPassword")

Route.post("/reinitialisation-mot-de-passe/:id","AuthController.resetPassword")

Route.group(()=>{
  Route.get("/connexion","AuthController.showLoginForm")
  Route.post("/connexion","AuthController.login")
  Route.get("/inscription","AuthController.showRegisterForm")
  Route.post("/inscription","AuthController.register")
  Route.get("/mot-de-passe-oublie","AuthController.showForgotPassword")
  Route.post("/mot-de-passe-oublie","AuthController.forgotPassword")
}).middleware("redirectIfAuth")

Route.group(()=>{
  Route.get("/",()=>{return "dash"})
}).prefix("/dashboard").middleware("auth")

Route.post("/deconnexion",'AuthController.logout')