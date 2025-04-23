<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['part_name', 'part_serial', 'category_id'];
    public function category() 
    {
        return $this->belongsTo(Category::class);
    }

}
