<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use Notifiable, HasApiTokens;
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    
    public function buyLists()
    {
        return $this->hasMany('App\BuyList');
    }

    public function products()
    {
        return $this->belongsToMany('App\Product')->withPivot('category_id');
    }

    // public function accounts(){
    //     return $this->hasMany('App\Account');
    // }
}
