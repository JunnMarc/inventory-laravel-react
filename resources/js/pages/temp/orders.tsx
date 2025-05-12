import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import { File, Save, Trash2, } from "lucide-react";
import { useState } from "react";


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Order",
    href: "/order",
  },
];

const Order = () => {
  const [customerName, setCustomerName] = useState("");
const [orderItems, setOrderItems] = useState([
  { name: "Sample Item", qty: 1, amount: 100 },
]);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Order" />
      <div className="p-6 space-y-6 bg-[#d1d9e6] min-h-screen">
        {/* Top Toolbar */}
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
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
                      <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              onClick={() => window.print()}
            >
              <span>🖨️ Print Invoice</span>
            </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-blue-700 hover:text-blue-900 ml-4"
          >
        
          </Button>
        </div>

        {/* Customer Info */}
        <section className="bg-white rounded shadow-sm border border-gray-400 p-4 md:w-1/3">
          <h2 className="text-gray-800 font-normal mb-3">Customer Info</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="customerName"
                className="block font-semibold text-gray-800 mb-1"
              >
                Customer Name
              </label>
            <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
              />
              </div>
            <div>
              <label
                htmlFor="newCode"
                className="block font-semibold text-gray-800 mb-1"
              >
                New Code
              </label>
              <input
                id="newCode"
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
              />
            </div>
          </div>
        </section>

        {/* Order Items & Summary */}
        <section className="bg-white rounded shadow-sm border border-gray-400 p-4">
          {/* Order Items */}
          <div>
            <h2 className="text-gray-800 font-normal mb-3 border-b border-[#2a6b8a] pb-1">
              Order Items
            </h2>
            <div className="mb-2">
              <Button
                type="button"
                variant="outline"
                className="text-xs px-3 py-1"
              >
                Add Item
              </Button>
            </div>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-2 py-1">Item</th>
                  <th className="px-2 py-1 text-center">Qty</th>
                  <th className="px-2 py-1 text-right">Amount</th>
                  <th className="px-2 py-1 text-right">Total</th>
                </tr>
              </thead>
             <tbody>
                            {orderItems.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-2 py-1">{item.name}</td>
                  <td className="px-2 py-1 text-center">
                    <input
                      type="number"
                      value={item.qty}
                      min={0}
                      className="w-16 border border-gray-300 rounded px-1 py-0.5 text-center text-sm"
                      onChange={(e) => {
                        const newItems = [...orderItems];
                        newItems[index].qty = parseInt(e.target.value) || 0;
                        setOrderItems(newItems);
                      }}
                    />
                  </td>
                  <td className="px-2 py-1 text-right">
                    <input
                      type="number"
                      value={item.amount}
                      step="0.01"
                      className="w-20 border border-gray-300 rounded px-1 py-0.5 text-right text-sm"
                      onChange={(e) => {
                        const newItems = [...orderItems];
                        newItems[index].amount = parseFloat(e.target.value) || 0;
                        setOrderItems(newItems);
                      }}
                    />
                  </td>
                  <td className="px-2 py-1 text-right">
                    {(item.qty * item.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
              </tbody>


            </table>
          </div>

          {/* Summary */}
          <div className="mt-6">
            <h2 className="text-gray-800 font-normal mb-3 border-b border-[#2a6b8a] pb-1">
              Summary
            </h2>
            <div className="space-y-2 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>100.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>100.00</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Step 2: Printable Invoice Section START */}
              <div className="printable-invoice hidden print:block p-10 text-black text-sm font-sans leading-relaxed">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold">INVOICE</h1>
            <p className="text-xs">Computer Inventory System</p>
            <p className="text-xs">University of Mindanao, Matina, DAVAO CITY</p>
            <p className="text-xs">Contact #: 0912345678 / 123-4567 Email: ComputerInventory@gmail.com</p>
          </div>

          {/* Invoice Meta */}
          <div className="flex justify-between text-xs mb-4">
            <div>
              <p><strong>BI #:</strong> BI-44012</p>
              <p><strong>Date:</strong> 4/21/2025</p>
              <p><strong>Status:</strong> Filed</p>
            </div>
            <div>
              <p><strong>Stock Out:</strong> Sale </p>
              <p><strong>Employee Name:</strong> </p>
              <p><strong>Billing Address:</strong> </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border border-black border-collapse text-xs mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-2 py-1 text-left">Item</th>
                <th className="border border-black px-2 py-1 text-center">Quantity</th>
                <th className="border border-black px-2 py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1">Sample Product</td>
                <td className="border border-black px-2 py-1 text-center">1</td>
                <td className="border border-black px-2 py-1 text-right">100.00</td>
                <td className="border border-black px-2 py-1 text-right">100.00</td>
              </tr>
            </tbody>
          </table>

          {/* Summary */}
          <div className="text-right text-sm space-y-1 mb-8">
            <p><strong>Subtotal:</strong> 867.00</p>
            <p><strong>Total Amount:</strong> 867.00</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs mt-12">
            <div>
              <p>____________________________</p>
              <p>Created By: Admin</p>
            </div>
            <div>
              <p>____________________________</p>
              <p>Approved By:</p>
            </div>
          </div>

          <div className="text-xs mt-4">
            <p>Print Date: Monday, April 21, 2025 8:19:17 PM</p>
          </div>
        </div>
      {/* Step 2: Printable Invoice Section END */}


    </AppLayout>
  );
};

export default Order;
