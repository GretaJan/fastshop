<?php

use Illuminate\Database\Seeder;
use App\Subcategory;

class SubcategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Subcategory::create([
            'name' =>  'Subkategorija-Vanduo',
            'category_id' => '1',
            'image' => '',
        ]);

        Subcategory::create([
            'name' =>  'Subkategorija-Maistas',
            'category_id' => '2',
            'image' => '',
        ]);
    }
}
