
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import {
  File,
  Save,
  X,
  Receipt,
  Truck,
} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Order",
    href: "/order",
  },
];

const Order = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Order" />
      <div className="p-6 space-y-6 bg-[#e8e8e8] min-h-screen">
        {/* Top Confirm Button */}
        <div className="flex items-center space-x-4 px-4 py-2 border border-gray-400 rounded bg-white">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <File className="h-4 w-4" />
            <span>New</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-green-700 hover:text-green-900"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-blue-700 hover:text-blue-900"
          >
            <X className="h-4 w-4" />
        <span>Cancel</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-1 text-blue-700 hover:text-blue-900 ml-4"
      >
           <Receipt className="h-4 w-4" />
        <span>Invoice</span>
      </Button>
      <div className="flex-grow" />
      <Button
        variant="outline"
        size="sm"
        className="text-gray-700 hover:bg-gray-100"
      >
            Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Left Column: Customer & New Code */}
          <section className="md:w-1/4 bg-[#d3e1e3] p-4 rounded border border-gray-300">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full bg-white text-black text-sm px-2 py-1 border border-transparent focus:outline-none"
                aria-label="Customer Name"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="New Code"
                className="w-full bg-white text-black text-sm px-2 py-1 border border-transparent focus:outline-none"
                aria-label="New Code"
              />
            </div>
          </section>

          {/* Right Column: Order Items and Summary */}
          <section className="md:flex-1 bg-[#d3e1e3] rounded border border-gray-300 p-2 flex flex-col">
            {/* Add Item Button */}
            <div className="mb-1">
              <button
                type="button"
                className="bg-white text-black text-xs rounded-full px-3 py-0.5"
              >
                Add Item
              </button>
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-400 text-sm">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="text-left pl-2 py-1">Item</th>
                  <th className="text-center w-20 py-1">
                    <div className="flex items-center justify-center gap-1 select-none">
                      <span className="font-bold">0</span>
                      <div className="flex flex-col leading-none">
                        <button
                          type="button"
                          className="text-xs text-[#d84300] leading-none -mb-1"
                          aria-label="Increase amount"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          className="text-xs text-[#d84300] leading-none -mt-1"
                          aria-label="Decrease amount"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="text-left pl-4 py-1">Amount</th>
                  <th className="text-left pl-4 py-1">Discount</th>
                  <th className="text-left pl-4 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="pl-2 py-2">
                    <button
                      type="button"
                      aria-label="Remove item"
                      className="text-black text-lg font-bold leading-none"
                    >
                      ×
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div className="border-t border-gray-400 mt-4 pt-2 text-right text-sm font-semibold space-y-1">
              <p>
                <span>Sub Total:</span> <span>0.00</span>
              </p>
              <p>
                <span>Discount:</span> <span>0.00</span>
              </p>
              <p>
                <span>Total:</span> <span>0.00</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Order;
