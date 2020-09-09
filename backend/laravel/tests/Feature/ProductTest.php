<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Product as Product;
use App\Category as Category;
use App\Subcategory as Subcategory;

class ProductTest extends TestCase
{
    use refreshDatabase;
    /** @test */
    public function product_can_be_created()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'Product'
        ]);
        $response->assertStatus(201);
        $this->assertCount(1, Product::all());
    }
    /** @test */
    public function product_name_required()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => ''
        ]);
        $response->assertJsonStructure(['errors'=>['name']]);
    }
    /** @test */
    public function product_name_must_contain_min_three_chars()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'ne'
        ]);
        $response->assertJsonStructure(['errors'=>['name']]);
    }
     /** @test */
     public function product_name_must_contain_max_fifty_chars()
     {
         $this->postJson('/api/addCategory', [
             'name' => 'Category'
         ]);
         $category = Category::first();
         $this->postJson('/api/addSubcategory/' . $category->id, [
             'name' => 'Subcategory'
         ]);
         $subcategory = Subcategory::first();
         $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
             'name' => 'food********************************************************************'
         ]);
         $response->assertJsonStructure(['errors'=>['name']]);
     }
    /** @test */
    public function product_energy_integer_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'food',
            'energy' => 12
        ]);
        $response->assertJsonStructure(['errors'=>['energy']]);
    }
    /** @test */
    public function product_post_fat_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'food',
            'fat' => '10.0'
        ]);
        $response->assertJsonStructure(['errors'=>['fat']]);
    }
     /** @test */
     public function product_post_saturated_format()
     {
         $this->postJson('/api/addCategory', [
             'name' => 'Category'
         ]);
         $category = Category::first();
         $this->postJson('/api/addSubcategory/' . $category->id, [
             'name' => 'Subcategory'
         ]);
         $subcategory = Subcategory::first();
         $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
             'name' => 'food',
             'saturated' => 100
         ]);
         $response->assertJsonStructure(['errors'=>['saturated']]);
     }
    /** @test */
    public function product_post_carbs_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'food',
            'carbs' => 2000
        ]);
        $response->assertJsonStructure(['errors'=>['carbs']]);
    }
    /** @test */
    public function product_post_sugar_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'food',
            'sugar' => 200.5
        ]);
        $response->assertJsonStructure(['errors'=>['sugar']]);
     }
    /** @test */
    public function product_post_fiber_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'food',
            'fiber' => '00.005'
        ]);
        $response->assertJsonStructure(['errors'=>['fiber']]);
    }
        /** @test */
      public function product_post_protein_format()
     {
         $this->postJson('/api/addCategory', [
             'name' => 'Category'
         ]);
         $category = Category::first();
         $this->postJson('/api/addSubcategory/' . $category->id, [
             'name' => 'Subcategory'
         ]);
         $subcategory = Subcategory::first();
         $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
             'name' => 'food',
             'protein' => 2000
         ]);
         $response->assertJsonStructure(['errors'=>['protein']]);
     }
        /** @test */
      public function product_post_salt_format()
     {
         $this->postJson('/api/addCategory', [
             'name' => 'Category'
         ]);
         $category = Category::first();
         $this->postJson('/api/addSubcategory/' . $category->id, [
             'name' => 'Subcategory'
         ]);
         $subcategory = Subcategory::first();
         $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
             'name' => 'food',
             'salt' => 2000
         ]);
         $response->assertJsonStructure(['errors'=>['salt']]);
    }
    /** @test */
    public function product_post_background_format()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory'
        ]);
        $subcategory = Subcategory::first();
        $response = $this->postJson('/api/addProduct/'. $subcategory->id, [
            'name' => 'food',
            'background' => 'rgb(0, 0, 0, 0.5)'
        ]);
        $response->assertJsonStructure(['errors'=>['background']]);
    }
    /** @test */
    public function can_retrieve_all_products()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name'
        ]);
        $response = $this->getJson('/api/products/' . $subcategory->id);
        $response->assertOk();
        $this->assertCount(1, Product::get());
    }
    /** @test */
    public function can_retrieve_single_product()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name'
        ]);
        $product = Product::first();
        $response = $this->getJson('/api/product/' . $subcategory->id . '/' . $product->id);
        $response->assertOk();
        $this->assertCount(1, Product::get());
    }
    /** @test */
    public function product_name_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated'
        ]);
        $response->assertStatus(201);
        $this->assertEquals('Product name updated', $product->fresh()->name);
    }
    /** @test */
    public function product_name_is_nullable_on_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name'
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => null
        ]);
        $this->assertEquals('Product name', $product->fresh()->name);
    }
    /** @test */
    public function product_name_min_three_chars_on_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'ne'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function product_name_max_fifty_chars_on_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'ne*********************************************************************************'
        ]);
        $response->assertJsonStructure(['errors' => ['name']]);
    }
    /** @test */
    public function product_energy_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'energy' => '555'
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'energy' => '1055'
        ]);
        $this->assertEquals('1055', $product->fresh()->energy);
    }
    /** @test */
    public function product_energy_integer_format_be_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'energy' => '1500'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'energy' => '5.55'
        ]);
        $response->assertJsonStructure(['errors' => ['energy']]);
    }
    /** @test */
    public function product_energy_integer_format_min_two_chars_be_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'energy' => '1000'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'energy' => '9'
        ]);
        $response->assertJsonStructure(['errors' => ['energy']]);
    }
    /** @test */
    public function product_energy_integer_format_max_six_chars_be_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'energy' => '12'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'energy' => '9000000'
        ]);
        $response->assertJsonStructure(['errors' => ['energy']]);
    }
    /** @test */
    public function product_energy_not_string_be_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'energy' => '1500'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'energy' => 'Food'
        ]);
        $response->assertJsonStructure(['errors' => ['energy']]);
    }
    /** @test */
    public function product_fat_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'fat' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'fat' => 11.7
        ]);
        // $this->assertEqualsWithDelta(11.7, $product->fresh()->fat, 0.1);
        $this->assertEquals(11.7, $product->fresh()->fat);
    }
    /** @test */
    public function product_fat_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'fat' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'fat' => 1,1
        ]);
        $response->assertJsonStructure(['errors' => ['fat']]);
    }
    /** @test */
    public function product_saturated_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'saturated' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'saturated' => 11.7
        ]);
        $this->assertEquals(11.7, $product->fresh()->saturated);
    }
    /** @test */
    public function product_saturated_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'saturated' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'saturated' => 1,1
        ]);
        $response->assertJsonStructure(['errors' => ['saturated']]);
    }
    /** @test */
    public function product_carbs_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'carbs' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'carbs' => .7
        ]);
        $this->assertEquals(0.7, $product->fresh()->carbs);
    }
    /** @test */
    public function product_carbs_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'carbs' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'carbs' => 0,1
        ]);
        $response->assertJsonStructure(['errors' => ['carbs']]);
    }
    /** @test */
    public function product_sugar_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'sugar' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'sugar' => 11.7
        ]);
        $this->assertEquals(11.7, $product->fresh()->sugar);
    }
    /** @test */
    public function product_sugar_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'sugar' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'sugar' => 111.1
        ]);
        $response->assertJsonStructure(['errors' => ['sugar']]);
    }
    /** @test */
    public function product_fiber_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'fiber' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'fiber' => 11.7
        ]);
        $this->assertEquals(11.7, $product->fresh()->fiber);
    }
    /** @test */
    public function product_fiber_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'fiber' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'fiber' => 1.111
        ]);
        $response->assertJsonStructure(['errors' => ['fiber']]);
    }
    /** @test */
    public function product_protein_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'protein' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'protein' => 11.7
        ]);
        $this->assertEquals(11.7, $product->fresh()->protein);
    }
    /** @test */
    public function product_protein_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'protein' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'protein' => 11.111
        ]);
        $response->assertJsonStructure(['errors' => ['protein']]);
    }
    /** @test */
    public function product_salt_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'salt' => 10.5
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name updated',
            'salt' => 11.70
        ]);
        $this->assertEquals(11.7, $product->fresh()->salt);
    }
    /** @test */
    public function product_salt_format_in_updated()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'salt' => 10.5
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'salt' => 1,10
        ]);
        $response->assertJsonStructure(['errors' => ['salt']]);
    }
    /** @test */
    public function product_background_can_be_updated()
    {
        $this->withoutExceptionHandling();
        $this->postJson('/api/addCategory', [
            'name' => 'Category name'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'background' => '#fff'
        ]);
        $product = Product::first();
        $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name',
            'background' => 'red'
        ]);
        $this->assertEquals('red', $product->fresh()->background);
    }
    /** @test */
    public function product_background_format_on_update()
    {
        $this->postJson('/api/addCategory', [
            'name' => 'Category name'
        ]);
        $category = Category::first();
        $this->postJson('/api/addSubcategory/' . $category->id, [
            'name' => 'Subcategory name'
        ]);
        $subcategory = Subcategory::first();
        $this->postJson('/api/addProduct/' . $subcategory->id, [
            'name' => 'Product name',
            'background' => '#fff'
        ]);
        $product = Product::first();
        $response = $this->putJson('/api/updateProduct/' . $subcategory->id . '/' . $product->id, [
            'name' => 'Product name',
            'background' => 'reeeeeeeeeeeeeeeeeeee'
        ]);
        $response->assertJsonStructure(['errors' => ['background']]);
    }
        /** @test */
        public function product_can_be_deleted()
        {
            $this->postJson('/api/addCategory', [
                'name' => 'Category name'
            ]);
            $category = Category::first();
            $this->postJson('/api/addSubcategory/' . $category->id, [
                'name' => 'Subcategory name'
            ]);
            $subcategory = Subcategory::first();
            $this->postJson('/api/addProduct/' . $subcategory->id, [
                'name' => 'Product name',
                'background' => '#fff'
            ]);
            $product = Product::first();
            $response = $this->deleteJson('/api/deleteProduct/' . $subcategory->id . '/' . $product->id);
            $this->assertCount(0, Product::all());
        }
}
