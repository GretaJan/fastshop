<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Subcategory;

class UserProductTest extends TestCase
{
    protected $user_headers = null;
    private function setUpUser($id)
    {
        $user = User::find($id);
        $token = $user->createToken('Personal Access Token')->accessToken;
        $this->user_headers['Accept'] = 'application/json';
        $this->user_headers['Authorization'] = "Bearer $token";
    }
    // /** @test */
    // public function user_can_like_product()
    // {
    //     $this->withoutExceptionHandling();
    //     $user = User::orderBy('created_at', 'desc')->first();
    //     $this->setUpUser($user->id);
    //     $response = $this->getJson('/api/like-product/4/11', $this->user_headers);
    //     $response->assertStatus(201);
    // }
    // /** @test */
    // public function user_cannot_like_same_product()
    // {
    //     $this->withoutExceptionHandling();
    //     $user = User::orderBy('created_at', 'desc')->first();
    //     $this->setUpUser(2);
    //     $response = $this->getJson('/api/like-product/1/3', $this->user_headers);
    //     $response->assertStatus(400);
    // }
    // /** @test */
    // public function user_can_unlike_product()
    // {
    //     $this->withoutExceptionHandling();
    //     $user = User::find(2);
    //     $product = $user->products()->first();
    //     $this->setUpUser($user->id);
    //     $response = $this->getJson("/api/unlike-product/$product->id", $this->user_headers);
    //     $response->assertStatus(201);
    // }
    /** @test */
    public function user_can_access_his_fav_drinks()
    {
        $this->withoutExceptionHandling();
        $user = User::orderBy('created_at', 'desc')->first();
        $product = $user->products()->first();
        $category_id = Subcategory::find(11)->category_id;
        $this->setUpUser($user->id);
        $response = $this->getJson("/api/get-personal-favorites/$category_id", $this->user_headers);
        $response->assertStatus(201);
    }
    /** @test */
    public function user_can_access_top_twenty_drinks()
    {
        $this->withoutExceptionHandling();
        $user = User::orderBy('created_at', 'desc')->first();
        $product = $user->products()->first();
        $category_id = Subcategory::find(11)->category_id;
        $this->setUpUser($user->id);
        $response = $this->getJson("/api/get-top-favorites/$category_id", $this->user_headers);
        $response->assertStatus(201);
    }
}
