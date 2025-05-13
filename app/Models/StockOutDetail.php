<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StockOutDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_out_id',
        'part_id',
        'quantity',
        'unit_price',
    ];

    public function stockOut()
    {
        return $this->belongsTo(StockOut::class);
    }

    public function part()
    {
        return $this->belongsTo(Part::class);
    }
}
