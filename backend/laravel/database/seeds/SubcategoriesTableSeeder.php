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
            'name' =>  'Subkategorija',
            'category_id' => '1',
            'image' => '',
        ]);
    }
}
