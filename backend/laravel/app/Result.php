<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $fillable = [
        'ids'
    ];

    protected $casts = [
        'ids' => 'array' //format: {matchId: matchId, mismatchId: mismatchId}
    ];

    public function user(){
        return $this->hasOne('App\User');
    }
}
