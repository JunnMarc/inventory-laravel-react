<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use App\Models\Part;
use App\Models\StockOut;
use App\Models\StockOutDetail;
use App\Models\InventoryItem;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Barryvdh\DomPDF\Facade\Pdf;

class StockOutController extends Controller
{
    public function index(Request $request)
    {
        $stock_out = StockOut::with([
            'stockOutDetails' => function ($query) {
                $query->select('id', 'stock_out_id', 'quantity', 'unit_price');
            }
        ])
            ->when(
                $request->search,
                fn($q) => $q->where('customer_name', 'like', '%' . $request->search . '%')
            )
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('stockouts/stockouts-index', [
            'stock_out' => $stock_out,
            'filters' => $request->only('search'),
        ]);
    }

    public function show(StockOut $stockout)
    {
        $stockout->load(['stockOutDetails.part']);
        return Inertia::render('stockouts/stockouts-index', [
            'stock_out' => $stockout,
        ]);
    }

    public function invoice(StockOut $stockout)
    {
        $stockout->load(['stockOutDetails.part']);
        return Inertia::render('stockouts/stockouts-invoice', [
            'stock_out' => $stockout->append('total_amount'), 
        ]);
    }

    public function downloadInvoice(StockOut $stockout)
    {
        $pdf = Pdf::loadView('pdf.invoice', ['stock_out' => $stockout]);

        return $pdf->download("invoice_order_{$stockout->id}.pdf");
    }

    public function bulkDelete(Request $request)
    {
        StockOut::whereIn('id', $request->ids)->delete();

        return redirect()->route('stock-out.index')->with('success', 'Orders deleted successfully.');
    }

    public function create()
    {
        return Inertia::render('stockouts/stockouts-create', [
            'parts' => Part::select('id', 'part_name', 'unit_price')->get(),
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'nullable|string',
            'reason' => 'required|string',
            'stock_out_date' => 'required|date',
            'items' => 'required|array',
            'items.*.part_id' => 'required|exists:parts,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'nullable|numeric|min:0',
        ]);

        DB::transaction(function () use ($data) {
            $stockOut = StockOut::create([
                'customer_name' => $data['customer_name'],
                'reason' => $data['reason'],
                'stock_out_date' => $data['stock_out_date'],
            ]);

            foreach ($data['items'] as $item) {
                StockOutDetail::create([
                    'stock_out_id' => $stockOut->id,
                    'part_id' => $item['part_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                ]);

                $inventory = InventoryItem::where('part_id', $item['part_id'])->first();
                if ($inventory && $inventory->quantity >= $item['quantity']) {
                    $inventory->decrement('quantity', $item['quantity']);
                } else {
                    throw new \Exception("Insufficient stock for part ID: {$item['part_id']}");
                }

                StockLog::create([
                    'part_id' => $item['part_id'],
                    'type' => 'out',
                    'quantity' => $item['quantity'],
                    'reference_type' => 'stock_out',
                    'reference_id' => $stockOut->id,
                ]);
            }
        });

        return response()->json(['message' => 'Stock out recorded successfully']);
    }
}
