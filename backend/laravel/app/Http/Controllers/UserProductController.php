<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Product;
use App\Subcategory;
use App\BuyList;
use App\Result;
use Illuminate\Validation\Rule;
use DB;
use Carbon\Carbon;

class UserProductController extends Controller
{

    public function getAllData()
    {
        $categories = Category::all();
        $subcategories = DB::table('subcategories')
                        ->get()
                        ->groupBy('category_id');
                        
        $products = DB::table('products')
                        ->get()
                        ->groupBy('subcategory_id');
        $buy_lists = null;
        $user = auth()->guard('api')->user(); 
        if(isset($user))
        {
            $user_products = $user->products;               
            $products->map(function($products_grouped) use ($user_products){
                $products_grouped->map(function($product) use ($user_products){
                    $product_liked = isset($user_products) ? $user_products->find($product->id) : null;
                    $product->isLiked = isset($product_liked) ? true : false;
                });
            });
            $buy_lists = $user->buyLists->groupBy(function ($item) {
                return Carbon::parse($item->date)->format('Y-m'); // grouping by years
            });
        }
 
        $response = [
            'categories' => $categories,
            'subcategories' => $subcategories,
            'products' => $products,
            'buy_lists' =>  $buy_lists
        ];
        return response()->json($response, 200);
    }

    private function validateBuyList($request)
    {
        $product_ids = Product::pluck('id')->toArray();
        return $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'name' => 'required|max:30',
            'list' => 'array|nullable',
            'list.name' => 'nullable|max:100',
            'list.quantity' => 'nullable|digits_between:0,1000',
            'list.checked' => ['nullable', 'regex:/^(true|false)$/'],
            'list.related_products' => ['array', 'nullable', Rule::in($product_ids)],
            'notes' => 'nullable|string|max:100',
            'is_completed' => 'nullable|boolean',
            'created_at' => 'required|date_format:Y-m-d H:i:s',
            'updated_at' => 'required|date_format:Y-m-d H:i:s',
        ]);
    }

    public function checkIfCompetedList($isCompleted, $listDate)
    {
        if($isCompleted) return true;
        $current_day = Carbon::now();
        $order_date = Carbon::parse($listDate);
        $result = $current_day->gt($order_date);
        if($result) return true;
            else return false;
    }

    public function likeProduct(Request $request, $category_id, $product_id)
    {
        $user = $request->user();
        $user_favorites = $user->products()->pluck('product_id')->toArray();
        if(in_array($product_id, $user_favorites))
        {
            $message = 'Product already liked.';
            return response()->json($message, 400);
        }
        $user->products()->attach($product_id, [
                    'category_id' => $category_id, 
                    'notes' => $request->notes, 
                ]);
        $message = 'Product liked.';
        return response()->json($message, 201);
    }

    public function unlikeProduct(Request $request, $product_id)
    {
        $user = $request->user();
        $user->products()->detach($product_id);
        $message = 'Product unliked.';
        return response()->json($message, 201);
    }

    public function getPersonalFavorites(Request $request, $category_id)
    {
        $favorites = $request->user()->products()->where('category_id', $category_id);
        return response()->json($favorites, 200);
    }
    //find top 10 favorites from all users
    public function getTopFavorites($category_id)
    {
        $products = DB::table('product_user')
            ->select('product_id', DB::raw('count(*)'))
            ->orderBy(\DB::raw('count(product_id)'), 'DESC')
            ->where('category_id', '=', $category_id)
            ->groupBy('product_id')
            ->limit(25)
            ->get();
        $products->map(function($product) {
            $product_found = Product::find($product->product_id);
            $product->product = $product_found;
        });
        return response()->json($products, 200);
    }

    public function updateCreateBuyList(Request $request)
    {
        $this->validateBuyList($request);
        $created_at = $request->created_at;
        $data = [
            'date' => $request->date,
            'name' => $request->name,
            'list' => $request->list,
            'notes' => $request->notes,
            'is_completed' => $this->checkIfCompetedList($request->is_completed, $request->date),
            'created_at' => $created_at,
            'updated_at' => $created_at
        ];
        $now = Carbon::now();
        $list = $request->user()->buyLists();
        if(isset($request->editable))
        {
            $list->update($data);
        } else {
            $list->create($data);
        }
        return response()->json(null, 201);
    }

    public function getBuyAllLists(Request $request)
    {
        $buy_lists = $request->user()->buyLists->groupBy('date');
        return response()->json($buy_lists, 200);
    }

    public function getBuyListsBuyDate(Request $request)
    {
        $buy_lists = $request->user()->buyLists()->where('date', $request->date)->get();
        return response()->json($buy_lists, 200);
    }
    public function getSingleBuyList(Request $request, $id)
    {
        $buy_list = $request->user()->buyLists()->find($id);
        return response()->json($buy_list, 200);
    }

    public function deleteBuyList(Request $request, $id)
    {
        $request->user()->buyLists()->delete($id);
        return response()->json(null, 201);
    }

    public function saveResults(Request $request)
    {
        $results = $request->user()->results;
        $old_ids_array = isset($results) ? $results->ids : null;
        $request_result = $request->result;
        $ids_array = [];
        if(isset($old_ids_array)) 
        {
            $old_ids_array = $results->ids;
            $request_created_at = $request->created_at;
            if(isset($request_created_at))
            {
                $created_at_array = collect($old_ids_array)->pluck('created_at')->toArray();
                $index = array_search($request_created_at, $created_at_array);
                if($index)
                {
                    unset($old_ids_array[$index]);
                    $ids_array = $old_ids_array;
                }
            } else {
                if(count($old_ids_array) <= 200)
                {
                    array_push($old_ids_array, $request_result);
                    $ids_array = $old_ids_array;
                }
            }
        } else {
            $ids_array = array($request_result);
            $results = new Result();
            $results->user_id = $request->user()->id;
        }
        $results->ids = $ids_array;
        $results->save();
        return response()->json(null, 201);
    }

}
