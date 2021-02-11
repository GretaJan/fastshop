<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Category as Category;
use App\User;

class CategoryTest extends TestCase
{
    // use RefreshDatabase;
    protected $admin_headers = null;
    private function setUpUser($id)
    {
        $admin = User::find($id);
        $token = $admin->createToken('Personal Access Token')->accessToken;
        $this->admin_headers['Accept'] = 'application/json';
        $this->admin_headers['Authorization'] = "Bearer $token";
    }
    /** @test */
    public function category_can_be_added()
    {
        $this->withoutExceptionHandling();
        $this->setUpUser(1);
        $response = $this->postJson('/api/addCategory', [
            'name' => 'Gėrimai',
        ], $this->admin_headers);
        $response->assertStatus(201);
        $this->assertCount(1, Category::all());
    }
    // /** @test */
    // public function category_name_is_required()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => '',
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['name']]);
    // }
    // /** @test */
    // public function category_name_more_than_three_chars()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'dr',
    //     ]);
    //     $response->assertJsonStructure(['errors'=>['name']]);
    // }
    // /** @test */
    // public function category_name_less_than_fifty_chars()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'driiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
    //     ]);
    //     $response->assertJsonStructure(['errors'=>['name']]);
    // }
    // /** @test */
    // public function category_img_format()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'van',
    //         'image' => 'dataimage/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAECCAYAAADjBlzIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAPCjSURBVHhe7P11mFXX0u4Nf39953rPeY88+7G9dxKs3d1daKGxxt3d3SVogAgRIAmuCRIkeCAkIVhwgru7u8Tur+4aa3av7qxkJ/uhadZ3ZnEVc7nMNfs37lmjqsb/x7aSsV9++SVH/A3bbbe9qDv+RGyz7eW3n3/++X3YZpttvzLHn4httr38RuVhDttfbLfd9gK3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmR2SC33XZXboPcNjcyG+S22+7KbZDb5kZmg9x22125DXLb3MhskNtuuyu3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmR2SC33XZXboPcNjcyG+S22+7KbZDb5kZmg9x22125DXLb3MhskNtuuyu3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmRvXwgL26uHmO77SXtNshtcyMrfZA72y/45ZefCxx0l4+z7f8Ocz5OXrTbILfNjaz0QG7swf27uHLxPM6cOIbjhw7g6MH9OHZoP44e+F63p44dwenjR3Hy'
    //         ]);
    //     $response->assertJsonStructure(['errors' => ['image']]);
    // }
    // /** @test */
    // public function category_background_format()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'food',
    //         'background' => 'rgba(0, 0, 0)'
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['background']]);
    // }
    // /** @test */
    // public function categories_can_be_retrieved()
    // {
    //     $this->post('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //         'image' => null
    //     ]);
    //     $response = $this->get('/api/categories');
    //     $response->assertOk();
    // }
    //  /** @test */
    // public function single_category_can_be_retrieved()
    // {
    //     $this->post('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //         'image' => null
    //     ]);
    //     $category = Category::first();
    //     $response = $this->getJson('/api/category/' . $category->id);
    //     $response->assertOk();
    // }
    // /** @test */
    // public function category_name_can_be_updated()
    // {
    //     $this->post('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //     ]);
    //     $category = Category::first();
    //    $response = $this->putJson('api/updateCategory/' . $category->id, [
    //     'name' => 'Category edited',
    //     'image' => null
    //    ]);
    //    $response->assertStatus(201);
    //    $this->assertEquals('Category edited', $category->fresh()->name);
    // }
    // /** @test */
    // public function category_update_name_required()
    // {
    //     $response = $this->post('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //     ]);
    //     $category = Category::first();
    //     $response = $this->putJson('/api/updateCategory/' . $category->id, [
    //         'name' => '',
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['name']]);
    // }
    // /** @test */
    // public function category_update_name_contains_min_three_chars()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //     ]);
    //     $category = Category::first();
    //     $response = $this->putJson('/api/updateCategory/' . $category->id, [
    //         'name' => 'gė',
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['name']]);
    // }
    // /** @test */
    // public function category_update_name_contains_max_fifty_chars()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //     ]);
    //     $category = Category::first();
    //     $response = $this->putJson('/api/updateCategory/' . $category->id, [
    //         'name' => 'gėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėėė',
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['name']]);
    // }
    // /** @test */
    // public function category_update_image_format()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //         'image' => 'dataimage/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAECCAYAAADjBlzIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAPCjSURBVHhe7P11mFXX0u4Nf39953rPeY88+7G9dxKs3d1daKGxxt3d3SVogAgRIAmuCRIkeCAkIVhwgru7u8Tur+4aa3av7qxkJ/uhadZ3ZnEVc7nMNfs37lmjqsb/x7aSsV9++SVH/A3bbbe9qDv+RGyz7eW3n3/++X3YZpttvzLHn4httr38RuVhDttfbLfd9gK3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmR2SC33XZXboPcNjcyG+S22+7KbZDb5kZmg9x22125DXLb3MhskNtuuyu3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmR2SC33XZXboPcNjcyG+S22+7KbZDb5kZmg9x22125DXLb3MhskNtuuyu3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmRvXwgL26uHmO77SXtNshtcyMrfZA72y/45ZefCxx0l4+z7f8Ocz5OXrTbILfNjaz0QG7swf27uHLxPM6cOIbjhw7g6MH9OHZoP44e+F63p44dwenjR3Hy'
    //     ]);
    //     $category = Category::first();
    //     $response = $this->putJson('/api/updateCategory/' . $category->id, [
    //         'name' => 'Gėrimai',
    //         'image' => 'image'        
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['image']]);
    // }
    // /** @test */
    // public function category_update_background_format()
    // {
    //     $response = $this->postJson('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //         'background' => '#fff',
    //     ]);
    //     $category = Category::first();
    //     $response = $this->putJson('/api/updateCategory/' . $category->id, [
    //         'name' => 'Gėrimai',
    //         'background' => 'ff'
    //     ]);
    //     $response->assertJsonStructure(['errors' => ['background']]);
    // }
    // /** @test */
    // public function category_can_be_deleted()
    // {
    //     $this->postJson('/api/addCategory', [
    //         'name' => 'Gėrimai',
    //     ]);
    //     $category = Category::first();
    //     $response = $this->deleteJson('/api/deleteCategory/' . $category->id);
    //     $this->assertCount(0, Category::all());
    // }
}
