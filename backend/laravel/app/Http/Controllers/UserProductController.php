<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Subcategory;
use DB;

class UserProductController extends Controller
{
    public function likeProduct(Request $request, $product_id, $subcategory_id)
    {
        $user = $request->user();
        $category_id = Subcategory::find($subcategory_id)->category_id;
        $user_favorites = $user->products()->pluck('product_id')->toArray();
        if(in_array($product_id, $user_favorites))
        {
            return response()->json(null, 400);
        }
        $user->products()->attach($product_id, ['category_id' => $category_id]);
        $message = 'Product liked.';
        return response()->json($message, 201);
    }

    public function unlikeProduct(Request $request, $product_id)
    {
        $user = $request->user();
        $user->products()->detach($product_id);
        $message = 'Product unliked.';
        return response()->json($message, 201);
    }

    public function getPersonalFavorites(Request $request, $category_id)
    {
        $user = $request->user();
        $favorites = $user->products()->where('category_id', $category_id)->get();
        return response()->json($favorites, 200);
    }
    //find top 10 favorites from all users
    public function getTopFavorites($category_id)
    {
        $products = DB::table('product_user')
            ->select('product_id', DB::raw('count(*)'))
            ->orderBy(\DB::raw('count(product_id)'), 'DESC')
            ->where('category_id', '=', $category_id)
            ->groupBy('product_id')
            ->limit(25)
            ->get();
    
        $products->map(function($product) {
            $product_found = Product::find($product->product_id);
            $product->product = $product_found;
        });
        return response()->json($products, 200);
    }
}
