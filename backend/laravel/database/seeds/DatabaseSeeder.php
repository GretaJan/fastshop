<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Category;
use App\Subcategory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(CategoriesTableDataSeeder::class);
        $this->call(SubcategoriesTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(UsersTableDataSeeder::class); 
    }
}
