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
            $table->decimal('fat', 4, 2)->nullable();
            $table->decimal('saturated', 4, 2)->nullable();
            $table->decimal('carbs', 4, 2)->nullable();
            $table->decimal('sugar', 4, 2)->nullable();
            $table->decimal('fiber', 4, 2)->nullable();
            $table->decimal('protein', 4, 2)->nullable();
            $table->decimal('salt', 4, 2)->nullable();
            $table->string('background')->nullable();
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
