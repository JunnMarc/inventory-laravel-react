import { Head, router, usePage } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Category = {
  id: number;
  name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Parts', href: '/parts' },
  { title: 'Create', href: '/parts/create' },
];

export default function PartsCreate() {
  const { props, url } = usePage<{ categories: Category[] }>();
  const categories = props.categories;

  const [form, setForm] = useState({
    category_id: '',
    part_name: '',
    part_serial: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Auto-select new category if returned via query param e.g. ?newCategoryId=5
  useEffect(() => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const newCategoryId = urlParams.get('newCategoryId');
    if (newCategoryId) {
      setForm((form) => ({ ...form, category_id: newCategoryId }));
    }
  }, [url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value: string) => {
    setForm({ ...form, category_id: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('parts.store'), form, {
      onError: (err) => setErrors(err),
    });
  };

  const handleCreateNewCategory = () => {
    router.visit(route('categories.create') + `?name=${encodeURIComponent(searchTerm)}`);
  };

  // Enable submit only if all required fields filled
  const isFormValid =
    form.category_id !== '' &&
    form.part_name.trim() !== '' &&
    form.part_serial.trim() !== '';

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add New Part" />
      <div className="max-w-4xl mx-auto py-10">
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Add a New Computer Part
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Select */}
              <div className="space-y-1.5">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  onValueChange={handleSelect}
                  value={form.category_id}
                  onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (isOpen) setSearchTerm(''); // reset search when dropdown opens
                  }}
                >
                  <SelectTrigger id="category_id">
                    <SelectValue placeholder="Select or search category" />
                  </SelectTrigger>

                  <SelectContent className="max-h-60">
                    {/* Search input inside dropdown */}
                    <div className="p-2">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search categories..."
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()} // prevent dropdown from closing when typing
                      />
                    </div>

                    {/* List filtered categories */}
                    {filteredCategories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}

                    {/* If no matches, show option to create */}
                    {filteredCategories.length === 0 && (
                      <div
                        onClick={handleCreateNewCategory}
                        className="cursor-pointer p-2 text-center text-blue-600 hover:bg-blue-100"
                      >
                        Create new category "{searchTerm}"
                      </div>
                    )}
                  </SelectContent>
                </Select>

                {errors.category_id && (
                  <p className="text-sm text-red-500">{errors.category_id}</p>
                )}
              </div>

              {/* Part Name */}
              <div className="space-y-1.5">
                <Label htmlFor="part_name">Part Name</Label>
                <Input
                  id="part_name"
                  name="part_name"
                  value={form.part_name}
                  onChange={handleChange}
                  className={errors.part_name ? 'border-red-500' : ''}
                />
                {errors.part_name && (
                  <p className="text-sm text-red-500">{errors.part_name}</p>
                )}
              </div>

              {/* Part Serial */}
              <div className="space-y-1.5">
                <Label htmlFor="part_serial">Model Serial Number</Label>
                <Input
                  id="part_serial"
                  name="part_serial"
                  value={form.part_serial}
                  onChange={handleChange}
                  className={errors.part_serial ? 'border-red-500' : ''}
                />
                {errors.part_serial && (
                  <p className="text-sm text-red-500">{errors.part_serial}</p>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={!isFormValid}>
                  Save Part
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
