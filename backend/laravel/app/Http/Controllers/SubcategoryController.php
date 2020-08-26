<?php

namespace App\Http\Controllers;

use App\Subcategory;
use App\Http\Resources\SubcategoryResource;
use App\Category;
use App\Product;
use Illuminate\Http\Request;
use File;

class SubcategoryController extends Controller
{
    public function index($category_id)
    {
        $category = Category::findOrFail($category_id);
        $subcategories = Subcategory::where('category_id', $category->id)->paginate(35);
        return SubcategoryResource::collection($subcategories);
    }

    public function store(Request $request, $category_id)
    {
        $subcategory = new Subcategory();

        $request->validate([
            'name' => 'required|min:3|max:100',
        ]);
        $subcategory->category_id = $category_id;
        $subcategory->name = $request->name; 
        $subcategory->background_color = $request->background_color;
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

        return response()->json($response, 200);
    }

    public function show($category_id, $id)
    {
        $subcategory = Subcategory::findOrFail($id);

        return response()->json(['subcategory' => $subcategory], 200);
    }


    public function update(Request $request, $category_id, $id )
    {
        $subcategory = Subcategory::findOrFail($id);
        if(!$subcategory) {
            return response()->json(['subcategory not found'], 400);
        }

        $request->validate([
            'name' => 'nullable|min:3|max:100',
        ]);
        $subcategory->name = $request->name; 
        $subcategory->background_color = $request->background_color;
        $base64 = $request->image;
         // IMAGE
        if($base64 == null) {
            $subcategory->image = null;
        } else {
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
            } else {
                $subcategory->image = $request->image;
            } 
        }   

        if($subcategory->save()) {
            $response = [
                'subcategory' => $subcategory
            ];
        }

        return response()->json($response, 200);
        
    }

    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();
        $subcategories = Subcategory::all();

        return response()->json(['Product Deleted'], 200);
    }
}
