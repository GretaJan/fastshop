<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('subcategory_id');
            $table->string('name')->nullable();
            $table->string('image')->nullable();
            $table->integer('energy')->nullable();
            $table->decimal('fat', 3,1)->nullable();
            $table->decimal('saturated', 3,1)->nullable();
            $table->decimal('carbs', 3,1)->nullable();
            $table->decimal('sugar', 3,1)->nullable();
            $table->decimal('fiber', 3,1)->nullable();
            $table->decimal('protein', 3,1)->nullable();
            $table->decimal('salt', 3,1)->nullable();
            $table->text('vitamins')->nullable();
            $table->string('background_color')->nullable();
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
        Schema::dropIfExists('products');
    }
}
