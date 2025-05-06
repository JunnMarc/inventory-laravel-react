import { Head, usePage, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { File, Save, Trash2, Package } from 'lucide-react';

type Part = {
  id: number;
  part_name: string;
  part_serial: string;
  category: any;
};

type Category = {
  id: number;
  category_name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Parts', href: '/parts' },
];

export default function PartsIndex() {
  const { props } = usePage<PageProps<{ parts: any; filters: any; categories: Category[] }>>();
  const { parts, filters, categories } = props;

  const [form, setForm] = useState({
    name: filters.name || '',
    serial: filters.serial || '',
    category_id: filters.category_id || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('parts.index'), form, {
      preserveScroll: true,
      preserveState: true,
      only: ['parts'],
    });
  };

  const handleClear = () => {
    setForm({ name: '', serial: '', category_id: '' });
    router.get(route('parts.index'), {}, {
      preserveScroll: true,
      preserveState: true,
      only: ['parts'],
    });
  };

  const handleAdd = () => router.visit(route('parts.create'));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Parts" />
      
      <div className="p-4 space-y-6 bg-white dark:bg-neutral-950">
        {/* Top Toolbar */}
        <div className="flex items-center space-x-4 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white"
            onClick={handleAdd}
          > 
            <File className="h-4 w-4" />
            <span>New</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
          {/* <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 ml-4"
          >
            <Package className="h-4 w-4" />
            <span>Adjust Quantity</span>
          </Button> */}
          {/* <div className="flex-grow" />
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => window.history.back()}
          >
            Back
          </Button> */}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Table Section */}
          <section className="flex-1 bg-white dark:bg-neutral-900 rounded shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 pt-4 pb-2">
              <h1 className="text-xl font-semibold text-neutral-800 dark:text-white">Parts</h1>
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-sm">
            </div>

            <div className="overflow-auto min-h-[300px] max-h-[300px]">
              {parts.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground space-y-4">
                  <Frown className="h-10 w-10 text-yellow-500" />
                  <p className="text-lg font-medium">No parts found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-center">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parts.data.map((part: Part) => (
                      <TableRow key={part.id}>
                        <TableCell>{part.part_name}</TableCell>
                        <TableCell>{part.category?.category_name || '—'}</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell className="text-center">$0.00</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-sm flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>
                Showing {parts.from} to {parts.to} of {parts.total} entries
              </span>
              <div className="flex items-center gap-2">
                {parts.links.map((link: any, i: number) => (
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
                        only: ['parts'],
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
                <label htmlFor="name" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="serial" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                  Serial
                </label>
                <input
                  id="serial"
                  value={form.serial}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="category_id" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                  Category
                </label>
                <select
                  id="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
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
