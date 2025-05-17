<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\InventoryItem;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with([
            'orderDetails' => function ($query) {
                $query->select('id', 'order_id', 'quantity', 'unit_price');
            }
        ])
            ->when(
                $request->search,
                fn($q) => $q->where('supplier_name', 'like', '%' . $request->search . '%')
            )
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('orders/orders-index', [
            'orders' => $orders,
            'filters' => $request->only('search'),
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['orderDetails.part']);
        return Inertia::render('orders/orders-show', [
            'order' => $order,
        ]);
    }

    public function invoice(Order $order)
    {
        $order->load(['orderDetails.part']);
        //dd($order);
        return Inertia::render('orders/orders-invoice', [
            'order' => $order->append('total_amount'),
        ]);
    }

    public function downloadInvoice(Order $order)
    {
        $pdf = Pdf::loadView('pdf.invoice', ['order' => $order]);

        return $pdf->download("invoice_order_{$order->id}.pdf");
    }

    public function bulkDelete(Request $request)
    {
        Order::whereIn('id', $request->ids)->delete();

        return redirect()->route('orders.index')->with('success', 'Orders deleted successfully.');
    }

    public function create()
    {
        return Inertia::render('orders/orders-create', [
            'parts' => Part::select('id', 'part_name', 'unit_price')->get(),
        ]);
    }

    public function receive(Request $request, Order $order)
    {
        // Eager load orderDetails
        $order->load('orderDetails.part');

        DB::transaction(function () use ($order) {
            foreach ($order->orderDetails as $detail) {
                $inventory = InventoryItem::firstOrCreate(
                    ['part_id' => $detail->part_id],
                    ['quantity' => 0]
                );

                $inventory->increment('quantity', $detail->quantity);

                StockLog::create([
                    'part_id' => $detail->part_id,
                    'type' => 'in',
                    'quantity' => $detail->quantity,
                    'reference_type' => 'order',
                    'reference_id' => $order->id,
                ]);
            }

            $order->update(['status' => 'received']);
        });

        return redirect()->route('orders.index')->with('success', 'Order received and inventory updated.');
    }


    public function store(Request $request)
    {
        $data = $request->validate(rules: [
            'supplier_name' => 'required|string',
            'supplier_type' => 'required|string',
            'order_date' => 'required|date',
            'items' => 'required|array',
            'items.*.part_id' => 'required|exists:parts,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($data) {
            $order = Order::create([
                'supplier_name' => $data['supplier_name'],
                'supplier_type' => $data['supplier_type'],
                'order_date' => $data['order_date'],
            ]);

            foreach ($data['items'] as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'part_id' => $item['part_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                ]);
                // scrapped
                // $inventory = InventoryItem::firstOrCreate(
                //     ['part_id' => $item['part_id']],
                //     ['quantity' => 0]
                // );
                // $inventory->increment('quantity', $item['quantity']);

                // StockLog::create([
                //     'part_id' => $item['part_id'],
                //     'type' => 'in',
                //     'quantity' => $item['quantity'],
                //     'reference_type' => 'order',
                //     'reference_id' => $order->id,
                // ]);
            }
        });

        return redirect()->route('orders.index')->with('success', 'Order recorded successfully');
    }
}
