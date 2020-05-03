<?php

namespace App\Http\Controllers;

use App\Product;
use App\Category;
use App\Subcategory;
use Illuminate\Http\Request;
use App\Html\Resources\ProductResource;
use File;

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
        $product->background_color = $request->background_color;

        $base64 = $request->image;
        if (preg_match('/^data:image\/(\w+);base64,/', $base64)) {
            $data = substr($base64, strpos($base64, ',') + 1);
            //Get file type
            $type = explode(';', $base64)[0];
            $type = explode('/', $type)[1]; // png or jpg etc
            //Move image
            $imageName = str_random(10) . '.' . $type;
            \File::put(public_path('/uploads/products') . '/' . $imageName, base64_decode($data));
            $path2 = asset('/uploads/products');
            $product->image =  $path2 . '/' . $imageName; 
        } else if ($base64 == null) {
            $product->image = null;
        } else {
            return response()->json(['message' => 'Invalid file format'], 400);
        }
 
        if($product->save()) {
            $response = [
                'product' => $product
            ];
        }
        
        return response()->json($response, 201);
    }

    public function show( $subcategory_id, $id )
    {
        $product = Product::findOrFail($id);

        return response()->json(["product" => $product], 200);
    }

    public function update(Request $request, $subcategory_id, $product)
    {
        $product = Product::findOrFail($product);

        $request->validate([
            'name' => 'nullable|min:3|max:100',
        ]);

        if(!$product) {
            return response()->json(['product not found'], 400);
        }
        // $request->validate([
        //     'name' => 'nullable|min:3|max:100',
        //     // 'energy' => 'nullable|numeric|min:2',
        //     // 'fat' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'saturated' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'carbs' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'sugar' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'fiber' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'protein' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'salt' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
        //     // 'vitamins' => 'nullable|regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50'
        // ]);
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
        $product->background_color = $request->background_color;
        
        // // IMAGE
        $base64 = $request->image;
        if($base64 === null) {
            $product->image = null;
        } else {
            if (preg_match('/^data:image\/(\w+);base64,/', $base64)) {
                $data = substr($base64, strpos($base64, ',') + 1);
                //Get file type
                $type = explode(';', $base64)[0];
                $type = explode('/', $type)[1]; // png or jpg etc
                //Move image
                $imageName = str_random(10) . '.' . $type;
                \File::put(public_path('/uploads/products') . '/' . $imageName, base64_decode($data));
                $path2 = asset('/uploads/products');
                $product->image =  $path2 . '/' . $imageName; 
            } else {
                $product->image = $request->image;
            } 
        } 
        if($product->save()) {
            $response = [
                'product' => $product
            ];
        }

        return response()->json($response, 201);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        var_dump("GET PRODUCT: ", $product);
        $products = Product::all();
        return response()->json(['message => "Product Deleted'], 200);
    }
}
