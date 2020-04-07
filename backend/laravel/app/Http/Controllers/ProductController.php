<?php

namespace App\Http\Controllers;

use App\Product;
use App\Category;
use App\Subcategory;
use Illuminate\Http\Request;
use App\Html\Resources\ProductResource;

class ProductController extends Controller
{

    public function index($subcategory_id)
    {
        $subcategory = Subcategory::findOrFail($subcategory_id);
        // $products = Product::where('subcategory_id', $subcategory->id);
        $products=$subcategory->products;
        $response = [
            'products' => $products,
            // 'subcategory' => $subcategory
        ];
        return response()->json($response, 200);
        
    }

    public function store(Request $request, $subcategory_id)
    {
        $product = new Product();
        $request->validate([
            'name' => 'required|min:3|max:100',
            'image' => 'nullable|image',
            // 'energy' => 'nullable|numeric',
            // 'fat' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'saturated' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'carbs' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'sugar' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'fiber' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'protein' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'salt' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'vitamins' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50'
        ]);
        $product->subcategory_id = $subcategory_id;
        $product->name = $request->name;
        $product->energy = $request->energy;
        $product->fat = $request->fat;
        $product->saturated = $request->saturated;
        $product->carbs = $request->carbs;
        $product->sugar = $request->sugar;
        $product->fiber = $request->fiber;
        $product->protein = $request->protein;
        $product->salt = $request->salt;
        $product->vitamins = $request->vitamins;

        // $file = $request->file('image');
        // if($request->hasFile('image')) {
        //     if($file->isValid()){
        //         $path = public_path('/uploads/products');
        //         $path2 = asset('/uploads/products');
        //         $file->move($path, $file . '/' . $file->getClientOriginalName());
        //         $product->image = $path2 . '/' . $file->getClientOriginalName();
        //     } else {
        //         return response()->json(['File format is invalid'], 400);
        //     }
        // } else {
        //     $product->image = '';
        // }

        // IMAGE
        $file = $request->image;
        if($file == null) {
            $product->image = null;
        } else if($file->isValid()) {
            $path = public_path('/uploads/subcategories');
            $path2 = asset('/uploads/subcategories');
            $file->move($path, $file->getClientOriginalName());
            $product->image = $path2 . '/' . $file->getClientOriginalName();
        } else {
            return $response()->json(["Message" => "Image must be a file"]);
         }

        if($product->save()) {
            $response = [
                'product' => $product
            ];
        }

        return response()->json($request, 201);
    }

    public function show($subcategory_id, $id )
    {
        $product = Product::findOrFail($id);

        return response()->json(["product" => $product], 200);
    }

    public function update(Request $request, $id, $subcategory_id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'nullable|min:3|max:100',
            'image' => 'nullable|image',
            // 'energy' => 'nullable|numeric|min:2',
            // 'fat' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'saturated' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'carbs' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'sugar' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'fiber' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'protein' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'salt' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            // 'vitamins' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50'
        ]);
        $product->name = $request->name;
        $product->energy = $request->energy;
        $product->fat = $request->fat;
        $product->saturated = $request->saturated;
        $product->carbs = $request->carbs;
        $product->sugar = $request->sugar;
        $product->fiber = $request->fiber;
        $product->protein = $request->protein;
        $product->salt = $request->salt;
        $product->vitamins = $request->vitamins;
        // $file = $request->file('image');
        // if($request->hasFile('image')) {
        //     if($file->isValid()){
        //         $path = public_path('/uploads/products');
        //         $path2 = asset('/uploads/products');
        //         $file->move($path, $file . '/' . $file->getClientOriginalName());
        //         $product->image = $path2 . '/' . $file->getClientOriginalName();
        //     } else {
        //         $product->image = '';
        //     }
        // }

        // IMAGE
        $file = $request->image;
        if($file == null) {
            $product->image = null;
        } else if($file->isValid()) {
            $path = public_path('/uploads/products');
            $path2 = asset('/uploads/products');
            $file->move($path, $file->getClientOriginalName());
            $product->image = $path2 . '/' . $file->getClientOriginalName();
        } else {
            return $response()->json(["Message" => "Image must be a file"]);
         }

        if($product->save()) {
            $response = [
                'product' => $product
            ];
        }

        return response()->json($request, 201);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        var_dump("GET PRODUCT: ", $product);
        $products = Product::all();
        return response()->json(['message => "Product Deleted'], 200);
    }
}
