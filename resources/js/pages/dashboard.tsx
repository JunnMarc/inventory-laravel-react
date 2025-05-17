import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, DollarSign, AlertTriangle, Box, Plus, FileText, UsersRound  } from "lucide-react";
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from "react";

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
        totalUsers = 0,
        recentTransactions = [],
        inventoryItems = [],
        stockThreshold = 10
    } = props;

    //router.reload({ only: ['inventoryItems', 'recentTransactions'] });
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    const handleDownloadReport = async () => {
        setIsGeneratingReport(true);
        try {
            window.open(route('dashboard.download'), '_blank');
        } catch (error) {
            console.error('Failed to generate report:', error);
            alert('Failed to generate report. Please try again.');
        } finally {
            setIsGeneratingReport(false);
        }
    };

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
                            <CardTitle className="text-sm font-medium">Users</CardTitle>
                            <UsersRound className="h-5 w-5 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">created</p>
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
                    <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={handleDownloadReport}
                        disabled={isGeneratingReport}
                    >
                        <FileText className="h-4 w-4" />
                        {isGeneratingReport ? 'Generating...' : 'Download Full Report'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Transactions (Left) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Stock Movements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentTransactions.data.length > 0 ? (
                                <>
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
                                            {recentTransactions.data.map((transaction, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell>{transaction.part?.part_name || 'N/A'}</TableCell>
                                                    <TableCell>{transaction.type.toUpperCase()}</TableCell>
                                                    <TableCell>{transaction.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    {/* Pagination for recentTransactions */}
                                    <div className="mt-4 flex gap-2 flex-wrap">
                                        {recentTransactions.links.map((link, i) => (
                                            <Button
                                                key={i}
                                                variant={link.active ? "default" : "outline"}
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url, { only: ['recentTransactions'] })}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </Button>
                                        ))}
                                    </div>
                                </>
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
                            {inventoryItems.data.length > 0 ? (
                                <>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {inventoryItems.data.map((item, index) => (
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

                                    {/* Pagination for inventoryItems */}
                                    <div className="mt-4 flex gap-2 flex-wrap">
                                        {inventoryItems.links.map((link, i) => (
                                            <Button
                                                key={i}
                                                variant={link.active ? "default" : "outline"}
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url, { only: ['inventoryItems'] })}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </Button>
                                        ))}
                                    </div>
                                </>
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
