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
            $model->slug = Str::slug($model->name);
            if ($model->isDirty(['street', 'city'])) {
                $response = Http::get("https://nominatim.openstreetmap.org/search", [
                    'street' => $model->street,
                    'city' => $model->city,
                    'country' => 'belgium',
                    'format' => 'json'
                ]);
                
                    $model->latitude = $response[0]['lat'];
                    $model->longitude = $response[0]['lon'];
                
            }
            if ($model->isDirty('logo') && gettype($model->logo) == 'object') {
                $model->logo = $model->logo->store('logos', 'public');
            }

            if ($model->isDirty('banner') && gettype($model->banner) == 'object') {
                $model->banner = $model->banner->store('banners', 'public');
            }
        });
    }
}
