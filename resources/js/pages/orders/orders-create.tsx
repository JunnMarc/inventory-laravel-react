import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { type BreadcrumbItem } from "@/types";
import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Orders", href: "/orders" },
    { title: "Create Order", href: "/orders/create" },
];

// Suggested supplier types for a computer parts inventory system
const SUPPLIER_TYPES = [
    "Hardware Manufacturer",
    "Wholesale Distributor",
    "Retail Supplier",
    "OEM (Original Equipment Manufacturer)",
    "Refurbished Parts Supplier",
    "Software Vendor",
    "Peripheral Supplier",
    "Local Vendor",
    "Online Marketplace",
    "Other",
];

type Part = {
    id: number;
    part_name: string;
    unit_price: number;
};

type OrderItem = {
    part_id: number | null;
    quantity: number;
    unit_price: number;
};

export default function OrderCreate() {
    const { parts } = usePage().props as { parts: Part[] };

    const { data, setData, post, processing, errors } = useForm({
        supplier_name: "",
        supplier_type: "",
        order_date: new Date().toISOString().split("T")[0],
        items: [
            {
                part_id: null,
                quantity: 1,
                unit_price: 0,
            } as OrderItem,
        ],
    });

    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                part_id: null,
                quantity: 1,
                unit_price: 0,
            },
        ]);
    };

    const removeItem = (index: number) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
    };

    const updateItem = (index: number, field: keyof OrderItem, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };

        // If part_id changes, update the unit_price
        if (field === "part_id" && value) {
            const selectedPart = parts.find((part) => part.id === Number(value));
            if (selectedPart) {
                newItems[index].unit_price = selectedPart.unit_price;
            }
        }

        setData("items", newItems);
    };

    const calculateSubtotal = () => {
        return data.items.reduce(
            (sum, item) => sum + item.quantity * (item.unit_price || 0),
            0
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("orders.store"), {
            onSuccess: () => {
                // Handle success if needed
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Order" />
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Create New Order</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Supplier Information */}
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold">
                                Supplier Information
                            </h2>
                            <div className="space-y-2">
                                <Label htmlFor="supplier_name">
                                    Supplier Name
                                </Label>
                                <Input
                                    id="supplier_name"
                                    value={data.supplier_name}
                                    onChange={(e) =>
                                        setData(
                                            "supplier_name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter supplier name"
                                />
                                {errors.supplier_name && (
                                    <p className="text-sm text-red-500">
                                        {errors.supplier_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="supplier_type">
                                    Supplier Type
                                </Label>
                                <Select
                                    value={data.supplier_type}
                                    onValueChange={(value) =>
                                        setData("supplier_type", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select supplier type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SUPPLIER_TYPES.map((type) => (
                                            <SelectItem
                                                key={type}
                                                value={type}
                                            >
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.supplier_type && (
                                    <p className="text-sm text-red-500">
                                        {errors.supplier_type}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="order_date">Order Date</Label>
                                <Input
                                    id="order_date"
                                    type="date"
                                    value={data.order_date}
                                    onChange={(e) =>
                                        setData("order_date", e.target.value)
                                    }
                                />
                                {errors.order_date && (
                                    <p className="text-sm text-red-500">
                                        {errors.order_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold">
                                Order Summary
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span className="font-semibold">
                                        ${calculateSubtotal().toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Supplier Type:</span>
                                    <span className="font-semibold">
                                        {data.supplier_type || "Not specified"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4 bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                Order Items
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addItem}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Item
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4"
                                >
                                    <div className="md:col-span-5 space-y-2">
                                        <Label htmlFor={`part-${index}`}>
                                            Part
                                        </Label>
                                        <Select
                                            value={
                                                item.part_id
                                                    ? item.part_id.toString()
                                                    : ""
                                            }
                                            onValueChange={(value) =>
                                                updateItem(
                                                    index,
                                                    "part_id",
                                                    value ? Number(value) : null
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a part" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {parts.map((part) => (
                                                    <SelectItem
                                                        key={part.id}
                                                        value={part.id.toString()}
                                                    >
                                                        {part.part_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.items &&
                                            errors.items[index]?.part_id && (
                                                <p className="text-sm text-red-500">
                                                    {
                                                        errors.items[index]
                                                            ?.part_id
                                                    }
                                                </p>
                                            )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor={`quantity-${index}`}>
                                            Quantity
                                        </Label>
                                        <Input
                                            id={`quantity-${index}`}
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "quantity",
                                                    parseInt(e.target.value) ||
                                                    0
                                                )
                                            }
                                        />
                                        {errors.items &&
                                            errors.items[index]?.quantity && (
                                                <p className="text-sm text-red-500">
                                                    {
                                                        errors.items[index]
                                                            ?.quantity
                                                    }
                                                </p>
                                            )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor={`unit_price-${index}`}>
                                            Unit Price
                                        </Label>
                                        <Input
                                            id={`unit_price-${index}`}
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={item.unit_price}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "unit_price",
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0
                                                )
                                            }
                                        />
                                        {errors.items &&
                                            errors.items[index]?.unit_price && (
                                                <p className="text-sm text-red-500">
                                                    {
                                                        errors.items[index]
                                                            ?.unit_price
                                                    }
                                                </p>
                                            )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label>Total</Label>
                                        <div className="h-10 flex items-center">
                                            $
                                            {(
                                                item.quantity * item.unit_price
                                            ).toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeItem(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {errors.items && typeof errors.items === "string" && (
                            <p className="text-sm text-red-500">{errors.items}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? "Processing..." : "Save Order"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}