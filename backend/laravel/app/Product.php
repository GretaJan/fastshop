<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Product extends Model
{
    public function subcategory()
    {
        return $this->belongsTo('App\Subcategory');
    }

    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot('category_id', 'notes');
    }
    protected $appends = [ 'isLiked' ]; 

    //append isLieked attribute to products when perwson is logged in to mark if person liked this product already
    public function getIsLikedAttribute()
    {
        $user = auth()->guard('api')->user();
        if(isset($user)) {
            $current_account = $user->current_account;
            $product_liked = $user->products()->find($this->id);
            return isset($product_liked) ? true : false;
        } else {
            return null;
        }
    }
}
