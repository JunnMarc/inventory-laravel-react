<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Inventory Dashboard Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .company-info { margin-bottom: 30px; text-align: center; }
        .report-date { text-align: right; margin-bottom: 20px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
        .metric-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; margin: 10px 0; }
        .metric-label { font-size: 14px; color: #666; }
        .section-title { font-size: 18px; font-weight: bold; margin: 25px 0 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .status-low { background-color: #fff3cd; color: #856404; padding: 3px 8px; border-radius: 3px; }
        .status-ok { background-color: #d4edda; color: #155724; padding: 3px 8px; border-radius: 3px; }
        .footer { margin-top: 30px; text-align: center; font-size: 0.8em; color: #666; border-top: 1px solid #eee; padding-top: 10px; }
        .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Inventory Dashboard Report</h1>
    </div>

    <div class="company-info">
        <p><strong>CompStock Inventory System</strong></p>
        <p>University of Mindanao, Matina, DAVAO CITY</p>
        <p>Generated on: {{ \Carbon\Carbon::now()->format('F j, Y h:i A') }}</p>
    </div>

    <div class="metrics-grid">
        <div class="metric-card">
            <div class="metric-label">Total Products</div>
            <div class="metric-value">{{ $totalProducts }}</div>
            <div class="metric-description">All inventory items</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Low Stock Items</div>
            <div class="metric-value">{{ $lowStockItems }}</div>
            <div class="metric-description">Below {{ $stockThreshold }} stock</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Recent Orders</div>
            <div class="metric-value">{{ $recentOrders }}</div>
            <div class="metric-description">Last 7 days</div>
        </div>
        {{-- <div class="metric-card">
            <div class="metric-label">Total Revenue</div>
            <div class="metric-value">₱{{ number_format($totalRevenue, 2) }}</div>
            <div class="metric-description">This month</div>
        </div> --}}
    </div>

    <div class="two-columns">
        <div>
            <div class="section-title">Recent Stock Movements</div>
            @if(count($recentTransactions) > 0)
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($recentTransactions as $transaction)
                    <tr>
                        <td>{{ \Carbon\Carbon::parse($transaction['created_at'])->format('m/d/Y') }}</td>
                        <td>{{ $transaction['part']['part_name'] ?? 'N/A' }}</td>
                        <td>{{ strtoupper($transaction['type']) }}</td>
                        <td>{{ $transaction['quantity'] }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            @else
            <p>No recent stock movements</p>
            @endif
        </div>

        <div>
            <div class="section-title">Current Stock Levels</div>
            @if(count($inventoryItems) > 0)
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($inventoryItems as $item)
                    <tr>
                        <td>{{ $item['part']['part_name'] ?? 'N/A' }}</td>
                        <td>{{ $item['quantity'] }}</td>
                        <td>
                            @if($item['quantity'] < $stockThreshold)
                                <span class="status-low">Low Stock</span>
                            @else
                                <span class="status-ok">In Stock</span>
                            @endif
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            @else
            <p>No inventory data available</p>
            @endif
        </div>
    </div>

    <div class="footer">
        <p>This is an automatically generated report from the inventory system.</p>
        <p>Report generated at: {{ \Carbon\Carbon::now()->format('F j, Y h:i A') }}</p>
    </div>
</body>
</html>