<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Subcategory::class, function (Faker $faker) {
    $category_id = App\Category::pluck('id')->toArray();
    return [
        'category_id' => $faker->randomElement($category_id),
        'name' => $faker->name,
        'image' => $faker->images('images', 400, 300),
        'background' => null,
    ];
});
