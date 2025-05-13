<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = ['order_id', 'part_id', 'quantity', 'unit_price'];
    public function part()
{
    return $this->belongsTo(Part::class);
}

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

}
