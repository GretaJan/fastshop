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
        $category = new Category();
        $request->validate([
            'name' => 'required|min:3|max:100',
        ]);
        $category->name = $request->name;
        $category->background_color = $request->background_color;
        $category->border_color = $request->border_color;
        $base64=$request->image;

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

        } else if ($base64 == null) {
            $category->image = null;
        } else {
            return response()->json(['message' => 'Invalid file format'], 400);
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

        $request->validate([
            'name' => 'min:3|max:100'
        ]);

        $category->name = $request->name;
        $category->background_color = $request->background_color;
        $category->border_color = $request->border_color;
        $base64 = $request->image;

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
        } else if(preg_match('/^data:image\/(\w+);base64,/', !$base64)) {
            var_dump('isString' . $category->image . ' ' . is_string($base64));
            $category->image = $category->image;
        } else {
            $category->image = null;
        }
       
       
        // if ($request->hasfile('image')){

        //     $file = $request ->file('image');
        //         $path = public_path('/uploads/categories/');
        //         $path2 = asset('/uploads/categories/');
        //         $file->move($path, $file->getClientOriginalName());
        //         $category->image = $path2 . '/' . $file->getClientOriginalName();
               
        // } else if ($request->hasfile('image') == false) {
        //     $category->image = $request->image;
        // } else {
        //     return $request;
        //     $category->image = '';
        // }

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
