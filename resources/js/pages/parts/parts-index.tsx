import { Head, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

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
  const { props } = usePage<PageProps<{ parts: Part[] }>>();
  const parts = props.parts;

  const handleAdd = () => {
    router.visit(route('parts.create'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Parts" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Computer Parts</CardTitle>
          </CardHeader>

          <CardContent>
            {parts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 space-y-4">
                <Frown className="h-10 w-10 text-yellow-500" />
                <p className="text-lg font-medium">No parts been added.</p>
                <Button onClick={handleAdd}>Add your first parts</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parts.map((part: any) => (
                    <TableRow key={part.id}>
                      <TableCell>{part.name}</TableCell>
                      <TableCell>{part.brand}</TableCell>
                      <TableCell>{part.stock}</TableCell>
                      <TableCell>${part.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
