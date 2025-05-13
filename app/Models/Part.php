<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['part_name', 'part_serial', 'category_id', 'unit_price', 'stock_threshold'];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function inventoryItem()
    {
        return $this->hasOne(InventoryItem::class);
    }

}
