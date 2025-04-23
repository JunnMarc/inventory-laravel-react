<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Part;
use App\Models\Category;

class PartController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['name', 'serial', 'category_id']);

        $query = Part::query();

        if (!empty($filters['name'])) {
            $query->where('part_name', 'like', '%' . $filters['name'] . '%');
        }

        if (!empty($filters['serial'])) {
            $query->where('part_serial', 'like', '%' . $filters['serial'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        $parts = $query->with('category')->paginate(10)->withQueryString();
        $categories = Category::orderBy('category_name')->get(['id', 'category_name']);

        // Return Inertia response
        return Inertia::render('parts/parts-index', [
            'parts' => $parts,
            'filters' => $filters,
            'categories' => $categories,
        ]);
    }

    public function create() 
    {
        $categories = Category::select('id', 'category_name')->get();
        return Inertia::render('parts/parts-create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'part_name' => 'required|string|max:255',
            'part_serial' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        Part::create($validated);
        return redirect()->route('parts.index')->with('success', 'Part created successfully.');
    }
}
