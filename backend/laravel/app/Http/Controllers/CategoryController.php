<?php

namespace App\Http\Controllers;

use App\Category;
use App\Subcategory;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{

    public function index()
    {
        $products = Product::all();
        $subcategories = Subcategory::all();
        $categories = Category::all();

        $response = [
            'products' => $products,
            'subcategories' => $subcategories,
            'categories' => $categories
        ];

        return response()->json($response, 200);
    }

    public function show(Category $category)
    {
        $category = Category::findOrFail($category);
        $response = [
            'category' => $category
        ];
        
        return response()->json($response, 200);
    }

    public function store(Request $request)
    {
        $category = new Category();
        $request->validate([
            'name' => 'required|min:3|max:100',
            'image' => 'image'
        ]);
        $category->name = $request->name;

        if(!$request->hasFile('image')) {
            return response()->json(['uploaded file not found'], 400);
        }
        $file = $request->image;
        if(!$file->isValid()) {
            return response()->json(['uploaded file is not in valid format']);
        } else {
            $path = public_path('/uploads/categories');
            $path2 = asset('/uploads/categories');
            $file->move($path, $file->getClientOriginalName());
            $category->image = $path2 . '/' . $file->getClientOriginalName();
        }
        
        if($category->save())
        {
            $response = ['category' => $category];
        }
        return response()->json($response, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        
        
        if(!$id) {
            return response()->json(['Category not found'], 404);
        }

        var_dump($id);

        $request->validate([
            'name' => 'min:3|max:100',
            'image' => 'image'
        ]);

        $category->name = $request->name;
       
        if ($request->hasfile('image')){

            $file = $request ->file('image');
                $path = public_path('/uploads/categories/');
                $path2 = asset('/uploads/categories/');
                $file->move($path, $file->getClientOriginalName());
                $category->image = $path2 . '/' . $file->getClientOriginalName();
               
        } else if ($request->hasfile('image') == false) {
            $category->image = $request->image;
        } else {
            return $request;
            $category->image = '';
        }

        $category->save();
       
        $response = ["category" => $category];

        return response()->json($response, 201);
        
        // return new CategoryResource($category);

    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message - category deleted'], 200);
    }
}
