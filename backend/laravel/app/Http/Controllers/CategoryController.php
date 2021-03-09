<?php

namespace App\Http\Controllers;

use App\Category;
use App\Subcategory;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;
use File;
use DB;

class CategoryController extends Controller
{
    // public function getAllData()
    // {
    //     $categories = Category::all();
    //     $subcategories = DB::table('subcategories')
    //                     ->get()
    //                     ->groupBy('category_id');
                        
    //     $products = DB::table('products')
    //                     ->get()
    //                     ->groupBy('subcategory_id');
    //     $buy_lists = null;
    //     $user = auth()->guard('api')->user(); 
    //     if(isset($user))
    //     {
    //         $user_products = $user->products;               
    //         $products->map(function($products_grouped) use ($user_products){
    //             $products_grouped->map(function($product) use ($user_products){
    //                 $product_liked = isset($user_products) ? $user_products->find($product->id) : null;
    //                 $product->isLiked = isset($product_liked) ? true : false;
    //             });
    //         });
    //         $buy_lists = $user->buyLists->groupBy('date');
    //     }
    //     var_dump("buy: ", $buy_lists);
    //     $response = [
    //         'categories' => $categories,
    //         'subcategories' => $subcategories,
    //         'products' => $products,
    //         'buy_lists' =>  $buy_lists
    //     ];
    //     return response()->json($response, 200);
    // }

    public function index()
    {
        $categories = Category::all();

        $response = [
            'categories' => $categories
        ];

        return response()->json($response, 200);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        $response = [
            'category' => $category
        ];
        
        return response()->json($response, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:50',
            'image' => ['nullable', 'regex:/^(data:image\/(\w+);base64,)|(https?)/'],
            'background' => ['nullable', 'max: 20', 'regex:/^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/']
        ]);
        $category = new Category();
        $category->name = $request->name;
        $category->background = $request->background;
        $base64 = $request->image;
        if($base64 == null) {
            $category->image = null;
        } else if (preg_match('/^data:image\/(\w+);base64,/', $base64)) {
                $data = substr($base64, strpos($base64, ',') + 1);
                //Get file type
                $type = explode(';', $base64)[0];
                $type = explode('/', $type)[1]; // png or jpg etc
    
                //Move image
                $imageName = str_random(10) . '.' . $type;
                \File::put(public_path('/uploads/categories') . '/' . $imageName, base64_decode($data));
                $path2 = asset('/uploads/categories');
                $category->image =  $path2 . '/' . $imageName; 
        } else {
                return response()->json(['message' => 'Invalid file format'], 400);
        }
  
        if($category->save())
        {
            $response = ['category' => $category];
        }
        return response()->json($response, 201);
    }

    public function update($id, Request $request)
    {
        $category = Category::findOrFail($id);
        if(!$category) {
            return response()->json(['Category not found'], 404);
        }

        $request->validate([
            'name' => 'required|min:3|max:50',
            'image' => ['nullable', 'regex:/^(data:image\/(\w+);base64,)|(https?)/'],
            'background' => ['nullable', 'max: 20', 'regex:/^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/']
        ]);
        $category->name = $request->name;
        $category->background = $request->background;
        $base64 = $request->image;
        if($base64 == null) {
            $category->image = null;
        } else {
            if (preg_match('/^data:image\/(\w+);base64,/', $base64)) {
                $data = substr($base64, strpos($base64, ',') + 1);
                //Get file type
                $type = explode(';', $base64)[0];
                $type = explode('/', $type)[1]; // png or jpg etc
    
                //Move image
                $imageName = str_random(10) . '.' . $type;
                \File::put(public_path('/uploads/categories') . '/' . $imageName, base64_decode($data));
                $path2 = asset('/uploads/categories');
                $category->image =  $path2 . '/' . $imageName; 
            } else {
                $category->image = $request->image;
            }
        }
        if($category->save())
        {
            $response = ['category' => $category];
        }
        return response()->json($response, 201);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message - category deleted'], 200);
    }
}
