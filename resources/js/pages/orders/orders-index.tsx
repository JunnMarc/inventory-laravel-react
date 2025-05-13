// resources/js/Pages/Orders/Index.tsx

import { Head, usePage, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Frown, File, Trash2, Eye, FileText, Download } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Order = {
    id: number;
    supplier_name: string;
    created_at: string;
    total_amount: number;
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Orders', href: '/orders' }];

export default function OrdersIndex() {
    const { props } = usePage<PageProps<{ orders: any; filters: any }>>();
    const { orders, filters } = props;

    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    const toggleSelect = (id: number) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedOrders.length === orders.data.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.data.map((o: Order) => o.id));
        }
    };

    const handleDelete = () => {
        router.post(route('orders.bulk-delete'), { ids: selectedOrders }, {
            onSuccess: () => {
                setSelectedOrders([]);
                setShowDeleteDialog(false);
            },
            preserveScroll: true,
            preserveState: true,
            only: ['orders'],
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('orders.index'), { search }, {
            preserveScroll: true,
            preserveState: true,
            only: ['orders'],
        });
    };

    const handleClear = () => {
        setSearch('');
        router.get(route('orders.index'), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['orders'],
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div className="p-4 space-y-6 bg-white dark:bg-neutral-950">
                {/* Top Toolbar */}
                <div className="flex items-center space-x-4 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 mb-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => router.visit(route('orders.create'))}
                    >
                        <File className="h-4 w-4" />
                        <span>New</span>
                    </Button>

                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center space-x-1 text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
                                disabled={selectedOrders.length === 0}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Orders</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete {selectedOrders.length} selected order(s)?
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* Table Section */}
                    <section className="flex-1 bg-white dark:bg-neutral-900 rounded shadow-sm overflow-hidden flex flex-col">
                        <div className="px-4 pt-4 pb-2">
                            <h1 className="text-xl font-semibold text-neutral-800 dark:text-white">Orders</h1>
                        </div>

                        <div className="overflow-auto min-h-[300px] max-h-[300px]">
                            {orders.data.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground space-y-4">
                                    <Frown className="h-10 w-10 text-yellow-500" />
                                    <p className="text-lg font-medium">No orders found.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                <input
                                                    type="checkbox"
                                                    onChange={selectAll}
                                                    checked={selectedOrders.length === orders.data.length && orders.data.length > 0}
                                                />
                                            </TableHead>
                                            <TableHead>Supplier</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.data.map((order: Order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedOrders.includes(order.id)}
                                                        onChange={() => toggleSelect(order.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{order.supplier_name}</TableCell>
                                                <TableCell>{order.created_at}</TableCell>
                                                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                                                <TableCell className="text-right space-x-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="p-2 h-8 w-8"
                                                        onClick={() => router.visit(route('orders.show', order.id))}
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="p-2 h-8 w-8"
                                                        onClick={() => router.visit(route('orders.invoice', order.id))}
                                                        title="Invoice"
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="p-2 h-8 w-8"
                                                        asChild
                                                    >
                                                        <a
                                                            href={route('orders.invoice.download', order.id)}
                                                            download
                                                            title="Download"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>

                        <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-sm flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                            <span>
                                Showing {orders.from} to {orders.to} of {orders.total} entries
                            </span>
                            <div className="flex items-center gap-2">
                                {orders.links.map((link: any, i: number) => (
                                    <button
                                        key={i}
                                        className={`px-2 py-1 rounded text-sm ${link.active ? 'bg-primary text-white dark:bg-neutral-800 dark:text-neutral-300' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'} disabled:opacity-50`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.visit(link.url, {
                                                preserveScroll: true,
                                                preserveState: true,
                                                only: ['orders'],
                                            })
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Filter Section */}
                    <aside className="w-full max-w-xs bg-white dark:bg-neutral-900 rounded shadow-sm p-4">
                        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Filter</h2>
                        <form onSubmit={handleSearch} className="space-y-4 text-sm">
                            <div>
                                <label htmlFor="search" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                                    Search Supplier
                                </label>
                                <input
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                                />
                            </div>
                            <div className="flex space-x-2 pt-2">
                                <Button type="submit" className="w-full">
                                    Search
                                </Button>
                                <Button type="button" variant="secondary" onClick={handleClear} className="w-full">
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}