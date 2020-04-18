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
            // IMAGE
        // $file = $request->image; 
        // if($file == null) {
        //     $category->image = null;
        // }
        // // else if($file->isValid()) {
        //     else if($file) {
        //         $path = public_path('/uploads/categories');
        //         $path2 = asset('/uploads/categories');
        //         $file->move($path, $file->getClientOriginalName());
        //         $category->image = $path2 . '/' . $file->getClientOriginalName();
        //     } else {
        //         return $response()->json(["Message" => "Image must be a file"]);
        //      }

        $base64=$request->image;

        if (preg_match('/^data:image\/(\w+);base64,/', $base64)) {
            //     $data = substr($base64, strpos($base64, ',') + 1);
            
            //     $data = base64_decode($data);
            //    var_dump("DATA TO DECODED: ",  $data );
            //    $category->image = $data;
            $data = substr($base64, strpos($base64, ',') + 1);
            $imgName = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
            $type = explode(';', $imgName)[0];
            $type = explode('/', $type)[1]; // png or jpg etc
            $imageName = str_random(10) . '.' . 'png';
            \File::put(storage_path(). '/' . $imageName, base64_decode($data));
            $path2 = asset('/uploads/categories');
            $category->image =  $path2 . '/' . $imageName; 
        } 
        // else {
        //     $category->image = null;
        // }
       

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
