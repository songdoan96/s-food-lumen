<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    // protected $collection = 'checkouts';
    // protected $connection = 'mongodb';
    protected $with = ['user'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
