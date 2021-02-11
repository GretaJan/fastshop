<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductUserTable extends Migration
{
    public function up()
    {
        Schema::create('product_user', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('product_id');
            $table->integer('category_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_user');
    }
}
