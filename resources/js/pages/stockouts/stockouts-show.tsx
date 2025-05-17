import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StockOutShow() {
  const { order } = usePage().props as unknown as {
    order: {
      id: number;
      supplier_name: string;
      created_at: string;
      total_amount: number;
      order_details: Array<{
        id: number;
        part: { part_name: string };
        quantity: number;
        unit_price: number;
      }>;
    };
  };

  return (
    <AppLayout>
      <Head title={`Order #${order.id}`} />

      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
            <div className="text-sm text-muted-foreground space-y-1 mt-2">
              <div>
                Supplier: <strong>{order.supplier_name}</strong>
              </div>
              <div>
                Date: {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.order_details.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.part?.part_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.unit_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(item.quantity * item.unit_price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Badge className="px-4 py-2 text-lg">
                Total: ${order.total_amount?.toFixed(2) || '0.00'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}