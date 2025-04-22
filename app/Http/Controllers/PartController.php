<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Part;
use App\Models\Category;

class PartController extends Controller
{
    public function index()
    {
        $parts = Part::all(); // or Paginate
        return Inertia::render('parts/parts-index', [
            'parts' => $parts
        ]);
    }

    public function create() 
    {
        $categories = Category::select('id', 'name')->get();
        return inertia('parts/parts-create', [
            'categories' => $categories,
        ]);
    }
}
