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
            ->when($filters['name'] ?? null, fn($q, $name) => $q->where('name', 'like', "%{$name}%"))
            ->when($filters['email'] ?? null, fn($q, $email) => $q->where('email', 'like', "%{$email}%"))
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('users/users-index', [
            'users' => $users,
            'filters' => $filters,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'in:employee,manager'],
        ]);

        $user->update(['role' => $validated['role']]);

        return back()->with('success', 'Role updated.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:users,id'],
        ]);

        User::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Selected users deleted.');
    }

}