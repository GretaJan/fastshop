<?php

namespace App\Http\Controllers;

use App\Category;
use App\Subcategory;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;
use File;
class CategoryController extends Controller
{

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
            'image' => 'regex:/^data:image\/(\w+);base64,/',
            'background' => ['regex:/^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/']
        ]);
        $category = new Category();
        $category->name = $request->name;
        $category->background_color = $request->background_color;
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
            'image' => 'regex:/^data:image\/(\w+);base64,/',
            'background' => ['regex:/^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$/']
        ]);
        $category->name = $request->name;
        $category->background_color = $request->background_color;
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
