<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $order->id }}</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 40px; color: #333; }
        .invoice-container { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9; }
        h2, h3 { color: #2c3e50; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2c3e50; }
        .details { margin-top: 20px; }
        .table-container { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        th { background: #2c3e50; color: #fff; }
        .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <h2>Invoice</h2>
            <p>Order #{{ $order->id }}</p>
        </div>

        <div class="details">
            <p><strong>Supplier:</strong> {{ $order->supplier_name }}</p>
            <p><strong>Date:</strong> {{ $order->created_at->format('Y-m-d') }}</p>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->orderDetails as $item)
                        <tr>
                            <td>{{ $item->part->part_name ?? 'N/A' }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>${{ number_format($item->unit_price, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="total">
            <p>Total: ${{ number_format($order->total_amount, 2) }}</p>
        </div>
    </div>
</body>
</html>
