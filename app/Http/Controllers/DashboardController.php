<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\InventoryItem;
use App\Models\Order;
use App\Models\StockLog;

class DashboardController extends Controller
{
    // In your DashboardController
    public function index()
    {
        $stockThreshold = 5; // You can make this configurable

        return Inertia::render('dashboard', [
            'totalProducts' => InventoryItem::count(),
            'inventoryItems' => InventoryItem::with('part')->get(),
            'lowStockItems' => InventoryItem::where('quantity', '<', $stockThreshold)->count(),
            'recentOrders' => Order::where('created_at', '>', now()->subDays(7))->count(),
            'recentTransactions' => StockLog::with('part')
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($log) use ($stockThreshold) {
                    return [
                        'created_at' => $log->created_at,
                        'part' => $log->part ? ['part_name' => $log->part->part_name] : null,
                        'type' => $log->type,
                        'quantity' => $log->quantity,
                        'current_stock' => $log->current_stock ?? 0,
                    ];
                }),
            'stockThreshold' => $stockThreshold,
        ]);
    }
}
