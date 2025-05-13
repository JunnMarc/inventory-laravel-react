import React, { ReactNode, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

interface Category {
  category_name: ReactNode;
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface Filters {
  search: string;
}

interface Props extends PageProps {
  categories: {
    data: Category[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: Filters;
}

export default function CategoriesIndex({ categories, filters }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filterSearch, setFilterSearch] = useState(filters?.search ?? '');

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const isAllSelected = categories.data.length > 0 && selectedIds.length === categories.data.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.data.map((cat) => cat.id));
    }
  };

  const applyFilters = () => {
    router.visit(route('categories.index'), {
      data: { search: filterSearch },
      preserveScroll: true,
      preserveState: true,
    });
  };

  const deleteSelected = () => {
    if (confirm('Are you sure you want to delete selected categories?')) {
      router.delete(route('categories.bulk-destroy'), {
        data: { ids: selectedIds },
        preserveScroll: true,
        onSuccess: () => setSelectedIds([]),
      });
    }
  };

  return (
    <AppLayout>
      <Head title="Categories" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search categories..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            className="w-64"
          />
          <Button variant="outline" onClick={applyFilters}>Search</Button>
        </div>
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <Button variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete ({selectedIds.length})
            </Button>
          )}
          <Button size="sm" onClick={() => router.visit(route('categories.create'))}>
            <Plus className="w-4 h-4 mr-2" /> New Category
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox checked={isAllSelected} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(category.id)}
                  onCheckedChange={() => toggleSelection(category.id)}
                />
              </TableCell>
              <TableCell>{category.category_name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{format(new Date(category.created_at), 'PP')}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end gap-2">
        {categories.links.map((link, i) => (
          <Button
            key={i}
            variant={link.active ? 'default' : 'outline'}
            size="sm"
            disabled={!link.url}
            onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </AppLayout>
  );
}
