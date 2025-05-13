<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StockOutController;

use App\Http\Middleware\AdminOnly;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::prefix('parts')->name('parts.')->group(function () {
    Route::get('/', [PartController::class, 'index'])->name('index');
    Route::get('/create', [PartController::class, 'create'])->name('create');
    Route::post('/', [PartController::class, 'store'])->name('store');

    Route::get('/parts/{part}/edit', [PartController::class, 'edit'])->name('edit');
    Route::put('/parts/{part}', [PartController::class, 'update'])->name('update');

    Route::post('/parts/bulk-delete', [PartController::class, 'bulkDelete'])->name('bulk-delete');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::delete('/categories/bulk-destroy', [CategoryController::class, 'bulkDelete'])->name('categories.bulk-destroy');
});

Route::middleware(['auth', 'verified', AdminOnly::class])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users/{user}/update-role', [UserController::class, 'updateRole'])->name('users.update-role');
    Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
});


Route::prefix('orders')->name('orders.')->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('index');
    Route::get('/create', [OrderController::class, 'create'])->name('create');
    Route::post('/', [OrderController::class, 'store'])->name('store');
    Route::get('/{order}', [OrderController::class, 'show'])->name('show');

    // Invoice view and download
    Route::get('/{order}/invoice', [OrderController::class, 'invoice'])->name('invoice');
    Route::get('/{order}/invoice/download', [OrderController::class, 'downloadInvoice'])->name('invoice.download');

    // Bulk delete
    Route::post('/bulk-delete', [OrderController::class, 'bulkDelete'])->name('bulk-delete');
});

Route::prefix('stock-out')->name('stock-out.')->group(function () {
    Route::get('/', [StockOutController::class, 'index'])->name('index');
    Route::get('/create', [StockOutController::class, 'create'])->name('create');
    Route::post('/', [StockOutController::class, 'store'])->name('store');
    Route::get('/{stockout}', [StockOutController::class, 'show'])->name('show');

    // Invoice view and download
    Route::get('/{stockout}/invoice', [StockOutController::class, 'invoice'])->name('invoice');
    Route::get('/{stockout}/invoice/download', [StockOutController::class, 'downloadInvoice'])->name('invoice.download');

    // Bulk delete
    Route::post('/bulk-delete', [StockOutController::class, 'bulkDelete'])->name('bulk-delete');
});


Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/temp', function () {
    return Inertia::render('temp/orders');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
