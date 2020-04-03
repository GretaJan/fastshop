<?php

namespace App\Http\Controllers;

use App\Products;
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
        $products=$subcategory->product;
        $response = [
            'products' => $products,
            'subcategory' => $subcategory
        ];

        return response()->json($response, 200);
        
    }

    public function store(Request $request)
    {
        $product = new Product();
        $request->validation([
            'name' => 'required|min:3|max:100',
            'image' => 'image',
            'energy' => 'numeric|min:2|max:7',
            'fat' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'saturated' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'carbs' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'sugar' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'fiber' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'protein' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'salt' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'vitamins' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50'
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
        $product->subcategory_id = $request->subcategory_id;

        $file = $request->file('image');
        if($request->hasFile('image')) {
            if($file->isValid()){
                $path = public_path('/uploads/products');
                $path2 = asset('/uploads/products');
                $file->move($path, $file . '/' . $file->getClientOriginalName());
                $product->image = $path2 . '/' . $file->getClientOriginalName();
            } else {
                return response()->json(['File format is invalid'], 400);
            }
        } else {
            $product->image = '';
        }

        if($product->save()) {
            $response = [
                'product' => $product
            ];
        }

        return response()->json($request, 201);
    }

    public function show(Product $product, $subcategory_id)
    {
        $product = Product::findOrFail($product, $subcategory_id);

        return response()->json(["product" => $product], 200);
    }

    public function update(Request $request, $id, $subcategory_id)
    {
        $product = Product::findOrFail($id, $subcategory_id);

        $request->validation([
            'name' => 'min:3|max:100',
            'image' => 'image',
            'energy' => 'numeric|min:2|max:7',
            'fat' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'saturated' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'carbs' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'sugar' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'fiber' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'protein' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'salt' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50',
            'vitamins' => 'regex:/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/|max:50'
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
        $product->subcategory_id = $request->subcategory_id;

        $file = $request->file('image');
        if($request->hasFile('image')) {
            if($file->isValid()){
                $path = public_path('/uploads/products');
                $path2 = asset('/uploads/products');
                $file->move($path, $file . '/' . $file->getClientOriginalName());
                $product->image = $path2 . '/' . $file->getClientOriginalName();
            } else {
                $product->image = '';
            }
        }

        if($product->save()) {
            $response = [
                'product' => $product
            ];
        }

        return response()->json($request, 201);
    }

    public function destroy(Product $product, Subcategory $subcategory)
    {
        $product->delete();
        $products = Product::all();
        return response()->json(['message => "Product Deleted'], 200);
    }
}
