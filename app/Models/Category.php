<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = ['category_name'];

    public function parts() 
    {
        return $this->hasMany(Part::class, 'parts_category');
    }
}
