<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Show create form (optional if using React page only)
    public function create()
    {
        return Inertia::render('categories/categories-create');
    }

    // Store new category
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,category_name|max:255',
        ]);

        Category::create([
            'category_name' => $request->input('name'),
        ]);

        // Redirect back or wherever you want
        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    // Optional index method to list categories
    public function index()
    {
        $categories = Category::orderBy('category_name')->get();

        return Inertia::render('categories/categories-index', [
            'categories' => $categories,
        ]);
    }
}
