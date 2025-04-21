import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, DollarSign, AlertTriangle } from "lucide-react";
import { type BreadcrumbItem } from '@/types';

import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';

type Part = {
  id: number;
  name: string;
  brand: string;
  stock: number;
  price: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Parts',
        href: '/parts',
    },
];

export default function Parts() {
    const { props } = usePage();
    const parts = props.parts as Part[];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Parts" />
          <div>
            <h1 className="text-xl font-bold mb-4">Computer Parts</h1>
            <Button>Add New Part</Button>
            <table className="mt-4 w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Brand</th>
                  <th className="border px-4 py-2">Stock</th>
                  <th className="border px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part) => (
                  <tr key={part.id}>
                    <td className="border px-4 py-2">{part.name}</td>
                    <td className="border px-4 py-2">{part.brand}</td>
                    <td className="border px-4 py-2">{part.stock}</td>
                    <td className="border px-4 py-2">${part.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppLayout>
    );
};
