<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Subcategory;
use Carbon\Carbon;

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
    /** @test */
    public function user_can_get_all_data()
    {
        $this->withoutExceptionHandling();
        // $user = User::orderBy('created_at', 'desc')->first();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->getJson('/api/get-all-data', $this->user_headers);
        $response->assertStatus(200);
    }
    /** @test */
    public function user_can_like_product()
    {
        $this->withoutExceptionHandling();
        $user = User::orderBy('created_at', 'desc')->first();
        $this->setUpUser($user->id);
        $response = $this->getJson('/api/like-product/11/4', $this->user_headers);
        $response->assertStatus(201);
    }
    /** @test */
    public function user_cannot_like_same_product()
    {
        $this->withoutExceptionHandling();
        $user = User::orderBy('created_at', 'desc')->first();
        $this->setUpUser(2);
        $this->getJson('/api/like-product/11/4', $this->user_headers);
        $response = $this->getJson('/api/like-product/11/4', $this->user_headers);
        $response->assertStatus(400);
    }
    /** @test */
    public function user_can_unlike_product()
    {
        $this->withoutExceptionHandling();
        $user = User::find(2);
        $product = $user->products()->first();
        $this->setUpUser($user->id);
        $response = $this->getJson("/api/unlike-product/$product->id", $this->user_headers);
        $response->assertStatus(201);
    }
    /** @test */
    public function user_can_access_his_fav_drinks()
    {
        $this->withoutExceptionHandling();
        $user = User::orderBy('created_at', 'desc')->first();
        $product = $user->products()->first();
        $category_id = Subcategory::find(11)->category_id;
        $this->setUpUser($user->id);
        $response = $this->getJson("/api/get-personal-favorites/$category_id", $this->user_headers);
        $response->assertStatus(200);
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
        $response->assertStatus(200);
    }

    /** @test */
    public function create_products_list()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->postJson('/api/update-create-checklist', [
            'name' => 'Sąrašas',
            'list' => [
                [
                    'name' => 'Agurkai',
                    'quantity' => 4,
                    'checked' => 'false',
                    'related_products' => [13, 15]
                ]
            ],
            'notes' => rand(20000, 1000000) . 'ABC',
            'date' => '2021-02-24',
            'created_at' => '2021-02-24 10:15:20',
            'updated_at' => '2021-02-24 10:15:20',
            'is_completed' => false
        ], $this->user_headers);
        $response->assertStatus(201);
    }
    /** @test */
    public function create_products_list_date_only()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->postJson('/api/update-create-checklist', [
            'name' => 'Sąrašas',
            'date' => '2021-03-08',
            'created_at' => '2021-02-24 10:15:20',
            'updated_at' => '2021-02-24 10:15:20',
        ], $this->user_headers);
        // $response->assertStatus(422)
        //     ->assertJsonValidationErrors(['date' => 'Date']);
        $response->assertStatus(201);
    }
    /** @test */
    public function get_BuyLists_buy_date()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->postJson('/api/get-buy-lists-by-date', [
            'name' => 'Sąrašas',
            'date' => '2021-02-24',   
            'created_at' => '2021-02-24 10:15:20',
            'updated_at' => '2021-02-24 10:15:20',
        ], $this->user_headers);
        $content = json_decode($response->getContent());
        $this->assertGreaterThan(0, count($content));
        $response->assertStatus(200);
    }
    /** @test */
    public function get_single_BuyList()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->getJson('/api/get-buy-list/1', $this->user_headers);
        $content = collect($response->getContent())->toArray();
        $this->assertEquals(1, count($content));
        $response->assertStatus(200);
    }

    /** @test */
    public function get_BuyLists_all()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->getJson('/api/get-buy-lists', $this->user_headers);
        // $content = json_decode($response->getContent());
        // $this->assertGreaterThan(0, count($content));
        $response->assertStatus(200);
    }

    /** @test */

    public function delete_buyList()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $id = $user->buyLists()->first()->id;
        $response = $this->deleteJson('/api/delete-buy-list/'.$id, $this->user_headers);
        $response->assertStatus(201);
    }
    /** @test */
    public function save_results()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->postJson('/api/save-results', [
            'result' =>[
                    'matchId' => 1,
                    'mismatchId' => 1,
                    'created_at' => '10-11-1989'
            ],
           
        ], $this->user_headers);
        $response->assertStatus(201);
    }
    /** @test */
    public function delete_results()
    {
        $this->withoutExceptionHandling();
        $user = User::where('email', 'gretajan09@gmail.com')->first();
        $this->setUpUser($user->id);
        $response = $this->postJson('/api/save-results', [
            'created_at' => '10-11-1989'
        ], $this->user_headers);
        $response->assertStatus(201);
    }
}
