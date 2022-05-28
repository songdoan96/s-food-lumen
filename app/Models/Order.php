<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    // protected $collection = 'orders';
    // protected $connection = 'mongodb';
    protected $with = ['product'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
