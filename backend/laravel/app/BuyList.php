<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class BuyList extends Model
{

    protected $fillable = [
        'date', // order day
        'name',
        'list',
        'notes',
        'is_completed',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'list' => 'array' //Format: name, quantity, favorite product, isBought?, 
    ];

    protected $dates = [
        'date' => 'date:Y-m-d', 
        'created_at' => 'date:Y-m-d H:i',
        'updated_at' => 'date:Y-m-d H:i',
    ];

    // protected $appends = ['is_completed'];

    // public function getIsCompletedAttribute($value)
    // {
    //     var_dump("VAAAll: ", $value);
    //     if($value) return true;
    //     $current_day = Carbon::now()->format('Y-m-d');
    //     $order_date = Carbon::parse($this->date->format('Y-m-d'));
    //     $result = $current_day->gt($order_date);
    //     if($result) return true;
    //         else return false;
    // }   

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
