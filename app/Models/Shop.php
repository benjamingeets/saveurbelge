<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class Shop extends Model
{
    protected $guarded = [];
    use HasFactory;
    public static function boot()
    {
        parent::boot();

        self::saving(function ($model) {
            $model->slug =Str::slug($model->name);
            if($model->isDirty(['street','city'])){
                $response = Http::get("https://nominatim.openstreetmap.org/search",[
                    'street' => $model->street,
                    'city'=>$model->city,
                    'country'=>'belgium',
                    'format'=>'json'
                ])[0];

                $model->latitude =$response['lat'];
                $model->longitude = $response['lon'];
            }
            if($model->isDirty('logo') && gettype($model->logo)=='object'){
               $model->logo = $model->logo->store('logos','public');
            }
        });

    }
}
