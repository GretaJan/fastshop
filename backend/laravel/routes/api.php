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
Route::get('/category/{category}', 'CategoryController@show');
Route::post('/addCategory', 'CategoryController@store');
Route::put('/updateCategory/{id}', 'CategoryController@update');
Route::delete('/deleteCategory/{category}', 'CategoryController@delete');

Route::get('/subcategories/{category_id}', 'SubcategoryController@index');
Route::get('/subcategory/{category_id}/{subcategory}/{category_id}', 'SubcategoryController@show');
Route::post('/addSubcategory/{category_id}', 'SubcategoryController@store');
Route::put('/updateSubcategory/{category_id}/{id}', 'SubcategoryController@update');
Route::delete('/deleteSubcategory/{category_id}/{subcategory}', 'SubcategoryController@delete');

Route::get('/products/{subcategory_id}', 'ProductController@index');
Route::get('/product/{subcategory_id}/{product}', 'ProductController@show');
Route::post('/addProduct/{subcategory_id}', 'ProductController@store');
Route::put('/updateProduct/{subcategory_id}/{id}', 'ProductController@update');
Route::delete('/deleteProduct/{subcategory_id}/{product}', 'ProductController@delete');

Route::post('/login', 'UserController@login');
Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('/user', 'UserController@user');
    Route::get('/logout', 'UserController@logout');
});

