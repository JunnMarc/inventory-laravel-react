<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['part_name', 'part_serial', 'model_number', 'category_id', 'stock', 'price', 'status'];
    public function category() 
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
