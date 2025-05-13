<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StockLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'part_id',
        'type', // 'in' or 'out'
        'quantity',
        'reference_type', // 'order' or 'stock_out'
        'reference_id',
    ];

    public function part()
    {
        return $this->belongsTo(Part::class);
    }

    public function reference()
    {
        return $this->morphTo(null, 'reference_type', 'reference_id');
    }
}
