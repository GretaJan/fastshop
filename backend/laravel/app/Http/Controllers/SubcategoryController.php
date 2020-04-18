<?php

namespace App\Http\Controllers;

use App\Subcategory;
use App\Category;
use App\Product;
use Illuminate\Http\Request;
use File;

class SubcategoryController extends Controller
{
  
    public function index($category_id)
    {
        $category = Category::findOrFail($category_id);
        // $subcategories = Subcategory::where('category_id', $category->id);
        $subcategories = $category->subcategories;
        // $subcategories=Subcategory::all();
        
        $response = [
            'subcategories' => $subcategories,
            // 'category' => $category
        ];

        return response()->json($response, 200);
    }


    public function store(Request $request, $category_id)
    {
        $subcategory = new Subcategory();

        $request->validate([
            'name' => 'required|min:3|max:100',
        ]);

        // $subcategory->category_id = $request->subcategory_id;
        $subcategory->category_id = $category_id;
        $subcategory->name = $request->name; 
        $base64 = $request->image;

        if (preg_match('/^data:image\/(\w+);base64,/', $base64)) {
            $data = substr($base64, strpos($base64, ',') + 1);
            //Get file type
            $type = explode(';', $base64)[0];
            $type = explode('/', $type)[1]; // png or jpg etc
            //Move image
            $imageName = str_random(10) . '.' . $type;
            \File::put(public_path('/uploads/subcategories') . '/' . $imageName, base64_decode($data));
            $path2 = asset('/uploads/subcategories');
            $subcategory->image =  $path2 . '/' . $imageName; 
        } else if ($base64 == null) {
            $subcategory->image = null;
        } else {
            return response()->json(['message' => 'Invalid file format'], 400);
        }

        if($subcategory->save()) {
            $response = [
                'subcategory' => $subcategory
            ];
        }

        return response()->json($response, 201);
    }

    public function show($id, $category_id)
    {
        $subcategory = Subcategory::findOrFail($id);

        return response()->json(['subcategory' => $subcategory], 201);
    }


    public function update(Request $request, $id, $category_id)
    {
        $subcategory = Subcategory::findOrFail($id);

        $request->validate([
            'name' => 'nullable|min:3|max:100',
            'image' => 'nullable|image',
        ]);

        if(!$id) {
            return response()->json(['subcategory not found'], 400);
        }

        $subcategory->name = $request->name; 

        // $file = $request->file('image');
        // if($request->hasFile('image')) {
        //     if($file->isValid()) {
        //         $path = public_path('/uploads/subcategories');
        //         $path2 = asset('/uploads/subcategories');
        //         $file->move($path, $file . '/' . $file->getClientOriginalName());
        //         $subcategory->image = $path2 . '/' . $file->getClientOriginalName();
        //     } else {
        //         return response()->json(['file format is invalid'], 400);
        //     }
        // } else {
        //     $subcategory->image = '';
        // }

         // IMAGE
         $file = $request->image;
         if($file == null) {
             $subcategory->image = null;
         } else if($file->isValid()) {
             $path = public_path('/uploads/products');
             $path2 = asset('/uploads/products');
             $file->move($path, $file->getClientOriginalName());
             $subcategory->image = $path2 . '/' . $file->getClientOriginalName();
         } else {
             return $response()->json(["Message" => "Image must be a file"]);
          }

        if($subcategory->save()) {
            $response = [
                'subcategory' => $subcategory
            ];
        }

        return response()->json($response, 201);
        
    }

    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();
        $subcategories = Subcategory::all();

        return response()->json(['Product Deleted'], 200);
    }
}
