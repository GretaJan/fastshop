<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
        'user_id',
        'name'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function buyLists()
    {
        return $this->hasMany('App\BuyList');
    }

    public function products()
    {
        return $this->belongsToMany('App\Product')->withPivot('category_id');
    }

}
