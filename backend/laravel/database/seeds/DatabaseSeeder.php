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

        $user = new User();
        $user->name = 'Administratorius';
        $user->email = 'administratorius@info.lt';
        $user->email_verified_at = now(); 
        $user->password = 'qwerty';
        $user->save();

        $sub = new Subcategory();
        $sub->name = 'Administratorius';
        $sub->category_id = 1;
        $sub->image = ''; 
        $sub->save();
    }
}
