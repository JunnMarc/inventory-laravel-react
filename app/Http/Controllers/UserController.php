<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['name', 'email']);

        $users = User::query()
            ->when($filters['name'] ?? null, fn ($q, $name) => $q->where('name', 'like', "%{$name}%"))
            ->when($filters['email'] ?? null, fn ($q, $email) => $q->where('email', 'like', "%{$email}%"))
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('users/users-index', [
            'users' => $users,
            'filters' => $filters,
        ]);
    }
}