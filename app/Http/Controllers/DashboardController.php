<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\InventoryItem;
use App\Models\Order;
use App\Models\StockLog;
use Barryvdh\DomPDF\Facade\Pdf;

class DashboardController extends Controller
{
    public function index()
    {
        $stockThreshold = 10;

        return Inertia::render('dashboard', [
            'totalProducts' => InventoryItem::count(),
            'totalUsers' => User::count(),
            'inventoryItems' => InventoryItem::with('part')->paginate(5), // ✅ pagination added
            'lowStockItems' => InventoryItem::where('quantity', '<', $stockThreshold)->count(),
            'recentOrders' => Order::where('created_at', '>', now()->subDays(7))->count(),
            'recentTransactions' => StockLog::with('part')
                ->latest()
                ->paginate(5) // ✅ paginate instead of take
                ->through(fn($log) => [
                    'created_at' => $log->created_at,
                    'part' => $log->part ? ['part_name' => $log->part->part_name] : null,
                    'type' => $log->type,
                    'quantity' => $log->quantity,
                    'current_stock' => $log->current_stock ?? 0,
                ]),
            'stockThreshold' => $stockThreshold,
        ]);
    }
    public function download()
    {
        $data = [
            'totalProducts' => InventoryItem::count(),
            'lowStockItems' => InventoryItem::where('quantity', '<', 5)->count(),
            'recentOrders' => Order::where('created_at', '>', now()->subDays(7))->count(),
            //'totalRevenue' => Order::whereMonth('created_at', now()->month)->sum('total_amount'),
            'recentTransactions' => StockLog::with('part')
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($log) {
                    return [
                        'created_at' => $log->created_at,
                        'part' => $log->part ? ['part_name' => $log->part->part_name] : null,
                        'type' => $log->type,
                        'quantity' => $log->quantity,
                    ];
                }),
            'inventoryItems' => InventoryItem::with('part')
                ->orderBy('quantity')
                ->take(10)
                ->get()
                ->map(function ($item) {
                    return [
                        'part' => $item->part ? ['part_name' => $item->part->part_name] : null,
                        'quantity' => $item->quantity,
                    ];
                }),
            'stockThreshold' => 5,
        ];

        $pdf = Pdf::loadView('pdf.dashboard_report', $data);
        return $pdf->download('inventory_dashboard_report.pdf');
    }
}
