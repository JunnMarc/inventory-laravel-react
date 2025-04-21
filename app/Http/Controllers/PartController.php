<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Part;

class PartController extends Controller
{
    public function index()
    {
        $parts = Part::all(); // or paginate if you like
        return Inertia::render('parts', [
            'parts' => $parts
        ]);
    }   
}
