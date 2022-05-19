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
            $table->string('name')->nullable(false);
            $table->string('slug')->nullable(false);
            $table->string('street')->nullable(false);
            $table->string('city')->nullable(false);
            $table->string('facebook')->nullable(true);
            $table->string('instagram')->nullable(true);
            $table->string('website')->nullable(true);
            $table->string('latitude')->nullable(false);
            $table->string('longitude')->nullable(false);
            $table->string('title')->nullable(false);
            $table->string('logo')->nullable(true);
            $table->string('description')->nullable(true);
            $table->string('phone')->nullable(true);
            $table->string('email')->nullable(false);
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
