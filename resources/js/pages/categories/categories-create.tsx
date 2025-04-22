import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Categories', href: '/categories' },
  { title: 'Create', href: '/categories/create' },
];

export default function CategoryCreate() {
  const { url } = usePage();

  const urlParams = new URLSearchParams(url.split('?')[1]);
  const initialName = urlParams.get('name') ?? '';

  const [form, setForm] = useState({
    category_name: initialName,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setForm({ category_name: initialName });
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('categories.store'), { name: form.category_name }, {
      onError: (err) => setErrors(err),
      onSuccess: () => setForm({ category_name: '' }),
    });
  };

  const isFormValid = form.category_name.trim() !== '';

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create New Category" />
      <div className="max-w-4xl mx-auto py-10">
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Create a New Category
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="category_name">Category Name</Label>
                <Input
                  id="category_name"
                  name="category_name"
                  value={form.category_name}
                  onChange={(e) =>
                    setForm({ ...form, category_name: e.target.value })
                  }
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full dark:hover:bg-gray-300 hover:bg-gray-800 transition-colors"
                  disabled={!isFormValid}
                >
                  Save Category
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
