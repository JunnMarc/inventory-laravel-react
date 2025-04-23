
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import {
  File,
  Save,
  Trash2,
  Package,
  Truck,
} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Inventory Item",
    href: "/items",
  },
];

const InventoryItem = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Inventory Item" />
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
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-blue-700 hover:text-blue-900 ml-4"
          >
            <Package className="h-4 w-4" />
            <span>Adjust Quantity</span>
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
          {/* Left Column */}
          <section className="md:w-1/3 flex flex-col space-y-6 bg-white rounded shadow-sm border border-gray-400 p-4">
            <h2 className="text-gray-800 font-normal mb-3">Information</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Code
                </label>
                <input
                  id="code"
                  type="text"
                  className="w-full bg-[#c0c7d9] border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                  value=""
                  onChange={() => {}}
                />
              </div>
              <div>
                <label
                  htmlFor="customCode"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Custom Code
                </label>
                <input
                  id="customCode"
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                  value=""
                  onChange={() => {}}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                  value=""
                  onChange={() => {}}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Category
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="category"
                    type="text"
                    className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                    value=""
                    onChange={() => {}}
                  />
                  <button
                    type="button"
                    className="text-red-600 font-bold text-lg leading-none select-none"
                    aria-label="Remove category"
                  >
                    ×
                  </button>
                  <button
                    type="button"
                    className="text-gray-600 font-bold text-lg leading-none select-none"
                    aria-label="More options"
                  >
                    ...
                  </button>
                </div>
              </div>
            </div>

            {/* Other Information */}
            <div className="border-t border-[#2a6b8a] pt-4">
              <h2 className="text-gray-800 font-normal mb-3">Other Information</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="dateExpiration"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Date Expiration
                  </label>
                  <div className="relative">
                    <input
                      id="dateExpiration"
                      type="text"
                      placeholder="dd----yyyy"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                      value=""
                      onChange={() => {}}
                    />
                    <svg
                      className="absolute right-2 top-2.5 h-4 w-4 text-gray-600 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">
                    Remaining Before Expired
                  </label>
                  <input
                    type="text"
                    disabled
                    className="w-full bg-[#c0c7d9] border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                    value=""
                    readOnly
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Right Column */}
          <section className="md:w-2/3 flex flex-col space-y-6 bg-white rounded shadow-sm border border-gray-400 p-4">
            {/* Inventory and Pricing */}
            <div>
              <h2 className="text-gray-800 font-normal mb-3 border-b border-[#2a6b8a] pb-1">
                Inventory and Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <div>
                  <label
                    htmlFor="buyingPrice"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Buying Price
                  </label>
                  <input
                    id="buyingPrice"
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              
                <div>
                  <label
                    htmlFor="barcode"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Bar Code
                  </label>
                  <input
                    id="barcode"
                    type="text"
                    className="w-full bg-[#c0c7d9] border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 text-right"
                    value=""
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <label
                    htmlFor="sellingPrice"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Selling Price
                  </label>
                  <input
                    id="sellingPrice"
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 text-right"
                    value=""
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <label
                    htmlFor="currentInventoryCount"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Current Inventory Count
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="currentInventoryCount"
                      type="text"
                      className="flex-grow bg-[#c0c7d9] border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 text-right"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="minCount"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Min Count
                  </label>
                  <input
                    id="minCount"
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 text-right"
                    value=""
                    onChange={() => {}}
                  />
                </div>
                <div>
                <label
                    htmlFor="maxCount"
                    className="block font-semibold text-gray-800 mb-1"
                  >
                    Max Count
                  </label>
                  <input
                    id="maxCount"
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 text-right"
                    value=""
                    onChange={() => {}}
                  />
                </div>
                <div>
                  
                </div>
              </div>
            </div>

            {/* Supplier */}
            <div>
              <h2 className="text-gray-800 font-normal mb-3 border-b border-[#2a6b8a] pb-1">
                Supplier
              </h2>
              <div className="flex items-center space-x-2 mb-4 text-gray-600 cursor-pointer select-none">
                <Truck className="h-4 w-4" />
                <span className="text-sm">Add Supplier</span>
              </div>
              <div className="grid grid-cols-2 text-gray-800 font-semibold text-sm border-t border-gray-300 pt-2">
                <div>Name</div>
                <div className="text-right">Price</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default InventoryItem;

