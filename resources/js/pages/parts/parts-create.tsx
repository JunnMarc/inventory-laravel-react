import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';

type Category = {
  id: number;
  category_name: string;
};

export default function PartsCreate() {
  const { props, url } = usePage<{ categories: Category[] }>();
  const categories = props.categories;

  const [form, setForm] = useState({
    category_id: '',
    part_name: '',
    part_serial: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCategory = categories.find(c => c.id === Number(form.category_id));

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

  const handleSelectCategory = (id: number) => {
    setForm({ ...form, category_id: String(id) });
    setOpen(false);
  };

  const handleCreateNewCategory = (name: string) => {
    router.visit(route('categories.create') + `?name=${encodeURIComponent(name)}`);
  };

  const isFormValid =
    form.category_id !== '' &&
    form.part_name.trim() !== '' &&
    form.part_serial.trim() !== '';

  return (
    <AppLayout breadcrumbs={[{ title: 'Parts', href: '/parts' }, { title: 'Create', href: '/parts/create' }]}>
      <Head title="Add New Part" />
      <div className="max-w-4xl mx-auto py-10">
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Add a New Computer Part</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.post(route('parts.store'), form, { onError: (err) => setErrors(err) });
              }}
              className="space-y-6"
            >
              {/* Category Select with Popover */}
              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {selectedCategory ? selectedCategory.category_name : 'Select a category'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search category..."
                        value={searchTerm}
                        onValueChange={(value) => setSearchTerm(value)}
                      />
                      <CommandList>
                        <CommandEmpty>
                          <div className="text-center">
                            No results.<br />
                            <span
                              className="text-blue-600 underline cursor-pointer"
                              onClick={() => handleCreateNewCategory(searchTerm)}
                            >
                              Create new category "{searchTerm}"
                            </span>
                          </div>
                        </CommandEmpty>
                        {categories
                          .filter(cat =>
                            cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((cat) => (
                            <CommandItem
                              key={cat.id}
                              value={cat.category_name}
                              onSelect={() => handleSelectCategory(cat.id)}
                            >
                              {cat.category_name}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
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
                {errors.part_name && <p className="text-sm text-red-500">{errors.part_name}</p>}
              </div>

              {/* Serial Number */}
              <div className="space-y-1.5">
                <Label htmlFor="part_serial">Model Serial Number</Label>
                <Input
                  id="part_serial"
                  name="part_serial"
                  value={form.part_serial}
                  onChange={handleChange}
                  className={errors.part_serial ? 'border-red-500' : ''}
                />
                {errors.part_serial && <p className="text-sm text-red-500">{errors.part_serial}</p>}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full dark:hover:bg-gray-300 hover:bg-gray-800 transition-colors"
                  disabled={!isFormValid}
                >
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
