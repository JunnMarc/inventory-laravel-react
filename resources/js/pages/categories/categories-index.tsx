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
import { AlertTriangle } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

type Category = {
  id: number;
  name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

export default function Categories() {
  const { props } = usePage<PageProps<{ categories: Category[] }>>();
  const categories = props.categories;

  const handleAdd = () => {
    router.visit(route('categories.create'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Categories</CardTitle>
          </CardHeader>

          <CardContent>
            {categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 space-y-4">
                <AlertTriangle className="h-10 w-10 text-yellow-500" />
                <p className="text-lg font-medium">No categories have been added.</p>
                <Button onClick={handleAdd}>Add your first category</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category: any) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
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
