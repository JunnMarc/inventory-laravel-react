<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    protected $fillable = ['part_id', 'quantity'];
    public function part()
    {
        return $this->belongsTo(Part::class);
    }

}
