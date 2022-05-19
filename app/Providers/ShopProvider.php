<?php
namespace App\Providers;
use App\Models\Shop;

use Illuminate\Support\ServiceProvider;

class ShopProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        Shop::saving(function($shop){
            var_dump("ooui");
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
    
}

