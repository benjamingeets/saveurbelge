<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false)->unique();
            $table->string('slug')->nullable(false)->unique();
            $table->string('street')->nullable(false);
            $table->string('city')->nullable(false);
            $table->string('facebook')->nullable(true);
            $table->string('instagram')->nullable(true);
            $table->string('website')->nullable(true);
            $table->string('latitude')->nullable(false);
            $table->string('longitude')->nullable(false);
            $table->string('title')->nullable(false);
            $table->string('logo')->nullable(true)->default('logos/default.jpg');
            $table->string('banner')->nullable(true)->default('banners/default.jpg');
            $table->string('description')->nullable(true);
            $table->string('phone')->nullable(true);
            $table->string('email')->nullable(false);
            $table->boolean('accepted')->default(false);
            $table->boolean('is_bio')->default(false);
            $table->boolean('is_productor')->default(false);
            $table->boolean('accept_local_currency')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
};
