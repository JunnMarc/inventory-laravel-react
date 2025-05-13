<?php

namespace App\Http\Controllers;

use App\Models\StockOut;
use App\Models\StockOutDetail;
use App\Models\InventoryItem;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockOutController extends Controller
{
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
