<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BuyList extends Model
{

    protected $casts = [
        'list' => 'array' //Format: name, quantity, favorite product, isBought?, 
    ];

    public function account()
    {
        return $this->belongsTo('App\Account');
    }
}
