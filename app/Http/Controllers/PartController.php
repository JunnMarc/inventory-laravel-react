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
        $parts = Part::all(); // or paginate
        return Inertia::render('parts/parts-index', [
            'parts' => $parts
        ]);
    }

    public function create() 
    {
        $categories = Category::select('id', 'category_name')->get();
        return inertia('parts/parts-create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        // Validate
        $validated = $request->validate([
            'part_name' => 'required|string|max:255',
            'part_serial' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        Part::create($validated);
        return redirect()->route('parts.index')->with('success', 'Part created successfully.');
    }
}
