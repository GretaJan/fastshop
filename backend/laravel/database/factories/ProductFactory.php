<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(Model::class, function (Faker $faker) {
    $subcategory_id = App\Subcategory::pluck('id')->toArray();
    return [
        'subcategory_id' => $factory->randomElement($subcategory_id),
        'name' => $factory->name,
        'image' => $faker->images('images', 400, 300),
        'energy' => $faker->randomNumber,
        'fat' => $faker->randomFloat(1, 0, 10),
        'saturated' => $faker->randomFloat(1, 0, 10),
        'carbs' => $faker->randomFloat(1, 0, 10),
        'sugar' => $faker->randomFloat(1, 0, 10),
        'fiber' => $faker->randomFloat(1, 0, 10),
        'protein' => $faker->randomFloat(1, 0, 10),
        'salt' => $faker->randomFloat(1, 0, 10),
        'fat' => $faker->name,
        'background' => null,
    ];
});
