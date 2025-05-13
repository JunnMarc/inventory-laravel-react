import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function OrdersInvoice() {
  const { order } = usePage().props as unknown as {
    order: {
      id: number;
      supplier_name: string;
      created_at: string;
      total_amount: number;
      order_details: Array<{
        id: number;
        part: { part_name: string }; // Changed from 'name' to 'part_name'
        quantity: number;
        unit_price: number;
      }>;
    };
  };

    const downloadPdf = () => {
        window.open(`/orders/${order.id}/invoice/download`, '_blank')
    }

    // Format date with time
    const formattedDate = new Date(order.created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <AppLayout>
            <Head title={`Invoice for Order #${order.id}`} />

            <div className="max-w-4xl mx-auto p-6 space-y-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">Invoice</CardTitle>
                                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                                    <p>Order ID: <span className="font-medium">#{order.id}</span></p>
                                    <p>Supplier: <span className="font-medium">{order.supplier_name}</span></p>
                                    <p>Date: <span className="font-medium">{formattedDate}</span></p>
                                </div>
                            </div>
                            <Button onClick={downloadPdf} variant="outline">
                                Download PDF
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
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

                        <div className="flex justify-end mt-6">
                            <Badge variant="secondary" className="px-4 py-2 text-lg">
                                Total: ${order.total_amount?.toFixed(2) || '0.00'}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}