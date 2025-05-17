<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $appends = ['total_amount'];
    protected $fillable = ['supplier_name', 'supplier_type', 'order_date', 'status'];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function getTotalAmountAttribute()
    {
        return $this->orderDetails->sum(function($detail) {
            return $detail->quantity * $detail->unit_price;
        });
    }

}
