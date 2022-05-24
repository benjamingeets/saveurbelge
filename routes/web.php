<?php

use App\Http\Controllers\ShopsController;
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

Route::get('/', [ShopsController::class,'index'])->name('shop.index');
Route::get('/commerce', [ShopsController::class,'list'])->name('shop.list');
Route::get('/commerce/{slug}',[ShopsController::class,'show'])->name('shop.show');
Route::get('/commerce/{slug}/modifier',[ShopsController::class,'edit'])->name('shop.edit');
Route::post('/commerce/{slug}/modifier',[ShopsController::class,'update'])->name('shop.update');

Route::post('/commerce/{slug}',[ShopsController::class,'sendEditMail'])->name('shop.sendmail');
Route::get('/ajouter-mon-commerce/',[ShopsController::class,'create'])->name('shop.create');
Route::post('/ajouter-mon-commerce/',[ShopsController::class,'store'])->name('shop.store');

Route::get('/sitemap.xml', function () {
    return response()->view('sitemap', [
        'shops' => App\Models\Shop::all()
    ])->header('Content-Type', 'text/xml');
});