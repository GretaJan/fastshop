<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    /** @test */
    public function app_can_register_user()
    {
        $this->withoutExceptionHandling();
        $response = $this->postJson('/api/login-or-register', [
            'email' => rand(10000, 2555055) .'gretajan09@gmail.com',
        ]);
        $response->assertStatus(200);
    }
    /** @test */
    public function user_can_initiate_login_by_email()
    {
        $response = $this->postJson('/api/login-or-register', [
            'email' => 'gretajan09@gmail.com',
        ]);
        $response->assertStatus(200);
    }
    /** @test */
    public function user_can_login_with_access_code()
    {
        $this->withoutExceptionHandling();
        $response = $this->postJson('/api/login-user', [
            'email' => 'gretajan09@gmail.com',
            'password' => 4392557
        ]);
        $response->assertStatus(200);
    }
    /** @test */
    public function user_can_login_with_access_code_invalid_code()
    {
        $this->withoutExceptionHandling();
        $response = $this->postJson('/api/login-user', [
            'email' => 'gretajan09@gmail.com',
            'password' => 43925570
        ]);
        $response->assertStatus(401);
    }
     /** @test */
     public function user_can_login_with_access_code_expired_code_is_deleted()
     {
         $this->withoutExceptionHandling();
         $response = $this->postJson('/api/login-user', [
             'email' => 'gretajan09@gmail.com',
             'password' => 1675261
         ]);
         $response->assertStatus(401);
     }
}
