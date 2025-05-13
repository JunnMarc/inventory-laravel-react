import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, DollarSign, AlertTriangle, Box, Plus, FileText } from "lucide-react";
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const Dashboard = () => {
    const { props } = usePage();
    const {
        totalProducts = 0,
        lowStockItems = 0,
        recentOrders = 0,
        totalRevenue = 0,
        recentTransactions = [],
        inventoryItems = [], // New inventory items table
        stockThreshold = 5 // Default threshold if not provided
    } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6">
                {/* Top Metrics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{totalProducts}</p>
                            <p className="text-xs text-muted-foreground">All inventory items</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{lowStockItems}</p>
                            <p className="text-xs text-muted-foreground">Items below {stockThreshold} stock</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                            <ShoppingCart className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{recentOrders}</p>
                            <p className="text-xs text-muted-foreground">Last 7 days</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-5 w-5 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">₱{totalRevenue.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Button className="w-full gap-2" onClick={() => window.location.href = '/parts'}>
                        <Box className="h-4 w-4" />
                        Manage Inventory
                    </Button>
                    <Button variant="secondary" className="w-full gap-2" onClick={() => window.location.href = '/orders/create'}>
                        <Plus className="h-4 w-4" />
                        Create Order
                    </Button>
                    <Button variant="outline" className="w-full gap-2" onClick={() => window.location.href = '/reports'}>
                        <FileText className="h-4 w-4" />
                        View Reports
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Transactions (Left) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Stock Movements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentTransactions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentTransactions.map((transaction, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell>{transaction.part?.part_name || 'N/A'}</TableCell>
                                                <TableCell>{transaction.type.toUpperCase()}</TableCell>
                                                <TableCell>{transaction.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                    No recent stock movements
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Current Stock Table (Right) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Stock Levels</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {inventoryItems.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inventoryItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.part?.part_name || 'N/A'}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>
                                                    {item.quantity < stockThreshold ? (
                                                        <span className="px-2 py-1 text-sm font-semibold text-black bg-yellow-500 rounded">
                                                            Low Stock
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded">
                                                            In Stock
                                                        </span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                    No inventory data available
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
