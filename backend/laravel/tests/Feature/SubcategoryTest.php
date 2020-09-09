<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Subcategory as Subcategory;
use App\Category as Category;

class SubcategoryTest extends TestCase
{
    use refreshDatabase;
    /** @test */
    public function subcategory_can_be_created()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'background' => '#fff',
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'background' => '#CEB5A7',
        ]);
        $response->assertStatus(201);
        $this->assertCount(1, Subcategory::all());
    }
    /** @test */
    public function subcategory_name_is_required()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'background' => '#fff',
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => ''
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function subcategory_name_contains_min_three_chars()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'be'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function subcategory_name_contains_max_fifty_chars()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'beverage------------------------------------------------------'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function subcategory_background_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'beverage',
            'background' => 'rgb(0, 0, 0, 1)'
        ]);
        $response->assertJsonStructure(['errors' => ['background']]);
    }
    /** @test */
    public function subcategory_image_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'beverage',
            'image' => 'dataimage/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAECCAYAAADjBlzIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAPCjSURBVHhe7P11mFXX0u4Nf39953rPeY88+7G9dxKs3d1daKGxxt3d3SVogAgRIAmuCRIkeCAkIVhwgru7u8Tur+4aa3av7qxkJ/uhadZ3ZnEVc7nMNfs37lmjqsb/x7aSsV9++SVH/A3bbbe9qDv+RGyz7eW3n3/++X3YZpttvzLHn4httr38RuVhDttfbLfd9gK3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmR2SC33XZXboPcNjcyG+S22+7KbZDb5kZmg9x22125DXLb3MhskNtuuyu3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmR2SC33XZXboPcNjcyG+S22+7KbZDb5kZmg9x22125DXLb3MhskNtuuyu3QW6bG5kNctttd+U2yG1zI7NBbrvtrtwGuW1uZDbIbbfdldsgt82NzAa57ba7chvktrmRvXwgL26uHmO77SXtNshtcyMrfZA72y/45ZefCxx0l4+z7f8Ocz5OXrTbILfNjaz0QG7swf27uHLxPM6cOIbjhw7g6MH9OHZoP44e+F63p44dwenjR3Hy'
        ]);
        $response->assertJsonStructure(['errors' => ['image']]);
    }
    /** @test */
    public function subcategory_name_required()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'background' => '#fff',
            'image' => null
        ]);
        $category = Category::first();
        $response = $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => '',
            'background' => '#CEB5A7',
            'image' => null
        ]);
        $response->assertJsonStructure(['errors'=>['name']]);
    }
    /** @test */
    public function subcategories_can_be_retrieved()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'image' => null,
            'background' => '#fff'
        ]);
        $category = Category::first();

        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'image' => null,
            'background' => 'blue'
        ]);
        $response = $this->get('/api/subcategories/' . $category->id);
        $response->assertStatus(200);
    }
    /** @test */
    public function single_subcategory_can_be_retrieved()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'image' => null,
            'background' => '#fff'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'image' => null,
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->get('/api/subcategory/' . $category->id . '/' . $subcategory->id);
        $response->assertOk();
    }
    /** @test */
    public function subcategory_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'image' => null,
            'background' => '#fff'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'image' => null,
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->putJson('/api/updateSubcategory/' . $category->id . '/' . $subcategory->id, [
            'name' => 'Juice',
            'image' => null,
            'background' => 'yellow'
        ]);
        $response->assertStatus(201);
        $this->assertEquals('Juice', $subcategory->fresh()->name);
        $this->assertEquals('yellow', $subcategory->fresh()->background);
    }
    /** @test */
    public function subcategory_name_contains_required_update()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->putJson('/api/updateSubcategory/' . $category->id . '/' . $subcategory->id, [
            'name' => 'Gė'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function subcategory_name_contains_min_three_chars_update()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->putJson('/api/updateSubcategory/' . $category->id . '/' . $subcategory->id, [
            'name' => 'be'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function subcategory_name_contains_max_fifty_chars_update()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->putJson('/api/updateSubcategory/' . $category->id . '/' . $subcategory->id, [
            'name' => 'beverage------------------------------------------------------'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function subcategory_background_format_update()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->putJson('/api/updateSubcategory/' . $category->id . '/' . $subcategory->id, [
            'name' => 'beverage',
            'background' => 'rgba(0, 0, 0)'
        ]);
        $response->assertJsonStructure(['errors' => ['background']]);
    }
    /** @test */
    public function subcategory_image_format_update()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->putJson('/api/updateSubcategory/' . $category->id . '/' . $subcategory->id, [
            'name' => 'beverage',
            'image' => 'image'
        ]);
        $response->assertJsonStructure(['errors' => ['image']]);
    }
    /** @test */
    public function subcategory_can_be_deleted(){
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Beverage',
            'image' => null,
            'background' => '#fff'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Lemonade',
            'image' => null,
            'background' => 'blue'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->deleteJson('/api/deleteSubcategory/' . $subcategory->id);
        $response->assertOk();
        $this->assertCount(0, Subcategory::all());
    }
}
