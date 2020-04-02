<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\Subcategory;

class CategoriesTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Beverage',
            'image' => ''
        ]);
        Category::create([
            'name' => 'Food',
            'image' => ''
        ]);
    }

}
