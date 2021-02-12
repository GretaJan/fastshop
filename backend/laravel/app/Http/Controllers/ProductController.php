<?php

namespace App\Http\Controllers;

use App\Product;
use App\Category;
use App\Subcategory;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use File;

class ProductController extends Controller
{
    private function verify_null_on_update($old_value, $new_value)
    {
        return $new_value === null ? $old_value : $new_value;
    }
    public function getAllProducts($subcategory_id)
    {
        $subcategory = Subcategory::findOrFail($subcategory_id);
        $products = Product::where('subcategory_id', $subcategory->id)->orderBy('name')->paginate(35);
    
        return response()->json($products, 200);
    }

    public function store(Request $request, $subcategory_id)
    {
        $product = new Product();
        $request->validate([
            'name' => 'required|min:3|max:50',
            'image' => ['nullable', 'regex:/^(data:image\/(\w+);base64,)|(https?)/'],
            'energy' => 'nullable|integer|min:10|digits_between: 2,6',
            'fat' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'saturated' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'carbs' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'sugar' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'fiber' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'protein' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'salt' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'background' => ['nullable', 'max: 20', 'regex:/^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/']
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
        $product->background = $request->background;

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

    public function show($id )
    {
        $product = Product::findOrFail($id);
        $response = [
            'product' => $product
        ];
        return response()->json($response, 200);
    }

    public function update(Request $request, $subcategory_id, $product)
    {
        $product = Product::findOrFail($product);

        if(!$product) {
            return response()->json(['product not found'], 404);
        }
        $request->validate([
            'name' => 'nullable|min:3|max:50',
            'image' => ['nullable', 'regex:/^(data:image\/(\w+);base64,)|(https?)/'],
            'energy' => 'nullable|integer|min:10|digits_between: 2,6',
            'fat' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'saturated' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'carbs' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'sugar' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'fiber' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'protein' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'salt' => ['nullable', 'regex:/^\d{1,2}.\d{1,2}$/'],  // allow only decimals with dot separator
            'background' => ['nullable', 'max: 20', 'regex:/^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/']
        ]);
        $product->subcategory_id = $subcategory_id;
        $product->name = $this->verify_null_on_update($product->name, $request->name);
        $product->energy = $this->verify_null_on_update($product->energy, $request->energy);
        $product->fat = $this->verify_null_on_update($product->fat, $request->fat);
        // $product->fat = $request->fat;
        $product->saturated = $this->verify_null_on_update($product->saturated, $request->saturated);
        $product->carbs = $this->verify_null_on_update($product->carbs, $request->carbs);
        $product->sugar = $this->verify_null_on_update($product->sugar, $request->sugar);
        $product->fiber = $this->verify_null_on_update($product->fiber, $request->fiber);
        $product->protein = $this->verify_null_on_update($product->protein, $request->protein);
        $product->salt = $this->verify_null_on_update($product->salt, $request->salt);
        $product->background = $this->verify_null_on_update($product->background, $request->background);

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
        $products = Product::all();
        return response()->json(['message => "Product Deleted'], 200);
    }
}
