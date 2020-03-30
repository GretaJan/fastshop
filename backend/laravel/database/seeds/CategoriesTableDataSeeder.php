<?php

use Illuminate\Database\Seeder;
use App\Category;

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
            'image' => '',
            'name' => 'Food',
            'image' => ''
        ]);

        
    }

}
