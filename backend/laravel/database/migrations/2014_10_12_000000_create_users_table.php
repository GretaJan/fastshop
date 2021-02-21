<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('isAdmin')->default(0);
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
        $admin = [
            [
                'isAdmin' => 1,
                'name' => 'admin',
                'email' => 'gretajan099@gmail.comm',
                'password' => bcrypt(123456)
            ]
        ];
        DB::table('users')->insert($admin);
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
