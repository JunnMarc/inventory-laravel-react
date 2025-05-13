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

    public function index(Request $request)
    {
        $categories = Category::query()
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('categories/categories-index', [
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:categories,id'],
        ]);

        Category::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Selected categories deleted.');
    }

}
