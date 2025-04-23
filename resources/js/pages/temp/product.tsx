import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Parts",
    href: "/parts",
  },
];

const Product = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Item" />
      <div className="p-6 space-y-6 flex flex-col md:flex-row md:space-x-6">
        {/* Left section: Table and toolbar */}
        <section className="flex-1 flex flex-col bg-white rounded shadow-sm overflow-hidden">
          <h1 className="text-lg font-semibold px-4 pt-2 pb-1">Item</h1>

          {/* Toolbar */}
          <div className="flex items-center space-x-4 px-4 py-2 border-b border-gray-300 text-sm text-gray-700">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <i className="far fa-file-alt" />
              <span>New</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <i className="fas fa-sync-alt" />
              <span>Refresh</span>
            </Button>
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Filter"
              >
                <i className="fas fa-filter" />
              </Button>
            </div>
          </div>

          {/* Table container with vertical scroll */}
          <div className="flex-1 overflow-auto min-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Buying Price</TableHead>
                  <TableHead className="text-right">Selling Price</TableHead>
                  <TableHead className="text-right">Invt. Count</TableHead>
                  <TableHead>Invt. Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Empty rows as requested */}
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell className="text-right">&nbsp;</TableCell>
                    <TableCell className="text-right">&nbsp;</TableCell>
                    <TableCell className="text-right">&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and record info */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-300 text-xs font-semibold text-gray-700">
            <div>Record 0 / 0</div>
            <nav className="flex items-center space-x-1 text-gray-600">
              <button className="px-1 hover:text-gray-900" disabled>
                &laquo;
              </button>
              <button className="px-1 hover:text-gray-900" disabled>
                &laquo;
              </button>
              <button className="px-1 hover:text-gray-900" disabled>
                &laquo;
              </button>
              <button className="px-1 hover:text-gray-900" disabled>
                &laquo;
              </button>
              <select
                className="border border-gray-300 rounded text-xs px-1 py-0.5"
                disabled
              >
                <option>1</option>
              </select>
              <button className="px-1 hover:text-gray-900" disabled>
                &raquo;
              </button>
              <button className="px-1 hover:text-gray-900" disabled>
                &raquo;
              </button>
              <button className="px-1 hover:text-gray-900" disabled>
                &raquo;
              </button>
              <button className="px-1 hover:text-gray-900" disabled>
                &raquo;
              </button>
            </nav>
          </div>
        </section>

        {/* Right section: Filter sidebar */}
        <aside className="w-full max-w-xs bg-white rounded shadow-sm p-4 flex flex-col mt-6 md:mt-0">
          <h2 className="font-semibold text-gray-700 mb-4">Filter</h2>

          <form className="flex flex-col space-y-4 text-sm text-gray-700">
            <div>
              <label htmlFor="code" className="block font-semibold mb-1">
                Code
              </label>
              <input
                id="code"
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                value=""
                readOnly
              />
            </div>

            <div>
              <label htmlFor="name" className="block font-semibold mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                value=""
                readOnly
              />
            </div>

            <div>
              <label htmlFor="status" className="block font-semibold mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                disabled
              >
                <option>...</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block font-semibold mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                disabled
              >
                <option>...</option>
              </select>
            </div>

           
            <div className="flex space-x-4 pt-2">
              <Button className="w-full" disabled>
                Search
              </Button>
              <Button variant="secondary" className="w-full" disabled>
                Clear
              </Button>
            </div>
          </form>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Product;
