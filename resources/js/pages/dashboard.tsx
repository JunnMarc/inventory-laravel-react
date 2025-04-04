import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, DollarSign, AlertTriangle } from "lucide-react";

const Dashboard = () => {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6">
                {/* Top Metrics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">350</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">12</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                            <ShoppingCart className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">28</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-5 w-5 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">$5,230</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Button className="w-full">📦 Manage Inventory</Button>
                    <Button variant="secondary" className="w-full">🛒 Create Order</Button>
                    <Button variant="destructive" className="w-full">📜 View Reports</Button>
                </div>

                {/* Recent Transactions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Apr 1, 2025</TableCell>
                                    <TableCell>Chocolate Cake</TableCell>
                                    <TableCell>5</TableCell>
                                    <TableCell className="text-green-600">Completed</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Apr 1, 2025</TableCell>
                                    <TableCell>Croissant</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell className="text-yellow-600">Pending</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Apr 2, 2025</TableCell>
                                    <TableCell>Sourdough Bread</TableCell>
                                    <TableCell>8</TableCell>
                                    <TableCell className="text-green-600">Completed</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
