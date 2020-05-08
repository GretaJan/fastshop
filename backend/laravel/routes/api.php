<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/categories', 'CategoryController@index');
Route::get('/category/{id}', 'CategoryController@show');
Route::post('/addCategory', 'CategoryController@store');
Route::put('/updateCategory/{id}', 'CategoryController@update');
Route::delete('/deleteCategory/{category}', 'CategoryController@destroy');

Route::get('/subcategories/{category_id}', 'SubcategoryController@index');
Route::get('/subcategory/{category_id}/{id}', 'SubcategoryController@show');
Route::post('/addSubcategory/{category_id}', 'SubcategoryController@store');
Route::put('/updateSubcategory/{category_id}/{id}', 'SubcategoryController@update');
Route::delete('/deleteSubcategory/{subcategory}', 'SubcategoryController@destroy');

Route::get('/products/{subcategory_id}', 'ProductController@index');
Route::get('/product/{subcategory_id}/{id}', 'ProductController@show');
Route::post('/addProduct/{subcategory_id}', 'ProductController@store');
Route::put('/updateProduct/{subcategory_id}/{product}', 'ProductController@update');
Route::delete('/deleteProduct/{product}', 'ProductController@destroy');

Route::post('/login', 'UserController@login');
Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('/user', 'UserController@user');
    Route::get('/logout', 'UserController@logout');
});

