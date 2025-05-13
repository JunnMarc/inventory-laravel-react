<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StockOut extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'reason',
        'stock_out_date',
    ];

    public function details()
    {
        return $this->hasMany(StockOutDetail::class);
    }
}
