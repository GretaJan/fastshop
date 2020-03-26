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

    public function indexSingle(Category $category)
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

    public function update(Request $request, Category $category)
    {
        $category = Category::findOrFail($category);
        
        if(!$category) {
            return response()->json(['Category not found'], 404);
        }

        $request->validate([
            'name' => 'min:3|max:100',
            'image' => 'image'
        ]);

        $category->name = $request->name;

        // if(!$request->hasFile('image'))
        // {
        //     return response()->json(['Uploaded file not found'], 400);
        // }

        // $file = $request->hasFile('image');

        if ($request->hasfile('image')) {
            $file = $request ->file('image');
            if($file->isValid()) {
                $path = public_path('/uploads/categories');
                $path2 = asset('/uploads/categories');
                $file->move($path, $file->getClientOriginalName());
                $category->image = $path2 . '/' . $file->getClientOriginalName();

                    var_dump("file image: ".  $file->getClientOriginalName());
            }  else {
                return respone()->json(['invalid file format'], 400);
                var_dump("invalid format image: ".  $file);
            }
        } else if(is_string($file)) {
            $category->image = '';
            var_dump("invalid format image is Strng: ".  $file);
        }
        
        $category->save();

        $response = ["category" => $category];

        return response()->json($response, 201);
        
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message - category deleted'], 200);
    }
}
