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


//public
Route.group(() => {
  Route.get("/", async ({view})=>{
    return view.render("welcome")
  })
  Route.get("/recherche", "")
  Route.get("/connexion", "")
  Route.get("/commerce/:slug", "")
})


//user
Route.group(() => {

  Route.get("/", "")

  Route.group(() => {
    Route.get("/", "")
    Route.get("/modifier", "")
    Route.get("/supprimer", "")
  }).prefix("/mon-compte")

  Route.group(() => {
    Route.get("/ajouter", "")
    Route.group(() => {
      Route.get("/", "")
      Route.get("/supprimer", "")
      Route.group(() => {
        Route.get("/informations", "")
        Route.get("/liens", "")
        Route.get("/categories", "")
      }).prefix("/modifier")
    }).prefix("/:slug")
  }).prefix("/commerce")

}).prefix("/utilisateur")

//admin
Route.group(() => {
  Route.get("/", "")
}).prefix("/admin")