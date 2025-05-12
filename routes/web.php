<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::prefix('parts')->name('parts.')->group(function () {
    Route::get('/', [PartController::class, 'index'])->name('index');
    Route::get('/create', [PartController::class, 'create'])->name('create');
    Route::post('/', [PartController::class, 'store'])->name('store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    // Optional index or other routes if you want:
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});


Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/temp', function () {
    return Inertia::render('temp/orders');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
