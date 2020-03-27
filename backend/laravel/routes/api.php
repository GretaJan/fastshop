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

Route::get('/subcategories', 'SubcategoryController@index');
Route::get('/subcategory/{subcategory}/{category_id}', 'SubcategoryController@show');
Route::post('/addSubcategory', 'SubcategoryController@store');
Route::put('/updateSubcategory/{id}/{category_id}', 'SubcategoryController@update');
Route::delete('/deleteSubcategory/{subcategory}/{category_id}', 'SubcategoryController@delete');

Route::get('/products', 'ProductController@index');
Route::get('/product/{product}/{subcategory_id}', 'ProductController@show');
Route::post('/addProduct', 'ProductController@store');
Route::put('/updateProduct/{id}/{subcategory_id}', 'ProductController@update');
Route::delete('/deleteProduct/{product}/{subcategory}', 'ProductController@delete');

Route::post('/login', 'UserController@login');
Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('/user', 'UserController@user');
    Route::get('/logout', 'UserController@logout');
});

