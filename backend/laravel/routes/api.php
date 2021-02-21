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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/get-all-data', 'CategoryController@getAllData');

Route::get('/categories', 'CategoryController@index');
Route::get('/category/{category}', 'CategoryController@show');

Route::get('/subcategories/{category_id}', 'SubcategoryController@index');
Route::get('/subcategory/{category_id}/{id}', 'SubcategoryController@show');

Route::get('/products/{subcategory_id}', 'ProductController@getAllProducts');
Route::get('/product/{id}', 'ProductController@show');


// Route::post('/register-user', 'UserController@register');
Route::post('/login-or-register', 'UserController@login');
Route::post('/login-admin', 'UserController@loginAdmin');
Route::post('/login-user', 'UserController@loginUser');

Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('/user', 'UserController@user');
    Route::get('/logout', 'UserController@logout');
    //Category actions
    Route::post('/addCategory', 'CategoryController@store');
    Route::put('/updateCategory/{id}', 'CategoryController@update');
    Route::delete('/deleteCategory/{category}', 'CategoryController@destroy');
    //Subcategory actions
    Route::post('/addSubcategory/{category_id}', 'SubcategoryController@store');
    Route::put('/updateSubcategory/{category_id}/{id}', 'SubcategoryController@update');
    Route::delete('/deleteSubcategory/{subcategory}', 'SubcategoryController@destroy');
    //Product actions
    Route::post('/addProduct/{subcategory_id}', 'ProductController@store');
    Route::put('/updateProduct/{subcategory_id}/{product}', 'ProductController@update');
    Route::delete('/deleteProduct/{product}', 'ProductController@destroy');

    //User routes
    Route::get('/like-product/{category_id}/{product_id}', 'UserProductController@likeProduct');
    Route::get('/unlike-product/{product_id}', 'UserProductController@unlikeProduct');
    Route::get('/get-personal-favorites/{category_id}', 'UserProductController@getPersonalFavorites');
    Route::get('/get-top-favorites/{category_id}', 'UserProductController@getTopFavorites');
    //USER Products LIST
    Route::post('/update-create-checklist', 'UserProductController@updateCreateBuyList');
    Route::post('/get-buy-lists', 'UserProductController@getBuyListsBuyDate');
    Route::get('/get-buy-list/{id}', 'UserProductController@getSingleBuyList');
});

