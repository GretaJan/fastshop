<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'subcategory_id' => '1',
            'name' => 'vandens produktas'
        ]);

        Product::create([
            'subcategory_id' => '1',
            'name' => 'maisto produktas'
        ]);
        Product::create([
            'subcategory_id' => '2',
            'name' => 'vandens produktas'
        ]);

        Product::create([
            'subcategory_id' => '2',
            'name' => 'maisto produktas'
        ]);
    }
}
