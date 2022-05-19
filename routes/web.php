<?php
use App\Http\Controllers\ShopsController;
use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::resource('/', IndexController::class,[
    'names'=>[
        'index'=>'index'
    ]
]);
Route::get('/commerce/:slug',[ShopsController::class,'show']);
Route::get('/shops/',[ShopsController::class,'index']);
Route::get('/ajouter-mon-commerce/',[ShopsController::class,'create'])->name('shop.create');
Route::post('/ajouter-mon-commerce/',[ShopsController::class,'store'])->name('shop.store');