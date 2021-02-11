<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function subcategory()
    {
        return $this->belongsTo('App\Subcategory');
    }

    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot('category_id');
    }

    // public function getTopOccurrencesAttribute()
    // {
    //     return $this->subcategory_id;
    // }
}
