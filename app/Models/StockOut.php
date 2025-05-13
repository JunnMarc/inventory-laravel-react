<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class StockOut extends Model
{
    use HasFactory;

    protected $appends = ['total_amount'];
    protected $fillable = [
        'customer_name',
        'reason',
        'stock_out_date',
    ];

    public function getTotalAmountAttribute()
    {
        return $this->stockOutDetails->sum(function ($detail) {
            return $detail->quantity * $detail->unit_price;
        });
    }

    public function stockOutDetails()
    {
        return $this->hasMany(StockOutDetail::class);
    }
}
