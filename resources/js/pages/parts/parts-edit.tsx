import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import {
  ArrowLeft,
  Save,
} from 'lucide-react';

type Category = {
  id: number;
  category_name: string;
};

type Part = {
  id: number;
  part_name: string;
  part_serial: string;
  stock_threshold: number;
  category_id: number;
};

export default function PartsEdit() {
  const { props } = usePage<{
    categories: Category[];
    part: Part;
  }>();

  const { categories, part } = props;

  const [form, setForm] = useState({
    category_id: String(part.category_id),
    part_name: part.part_name,
    part_serial: part.part_serial,
    stock_threshold: String(part.stock_threshold),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCategory = categories.find(c => c.id === Number(form.category_id));

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
    form.part_serial.trim() !== '' &&
    form.stock_threshold.trim() !== '';

  const handleBack = () => router.visit(route('parts.index'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(route('parts.update', part.id), form, {
      onError: (err) => setErrors(err),
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Parts', href: '/parts' }, { title: 'Edit', href: `/parts/${part.id}/edit` }]}>
      <Head title={`Edit ${part.part_name}`} />
      <div className="p-4 space-y-6 bg-white dark:bg-neutral-950">
        <form onSubmit={handleSubmit}>
          {/* Top Toolbar */}
          <div className="flex items-center space-x-4 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 mb-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Button
              type='submit'
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-green-700 hover:text-green-900"
              disabled={!isFormValid}
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <section className="md:w-1/3 flex flex-col space-y-6 bg-white rounded shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
              <h2 className="text-gray-800 font-normal mb-3">Information</h2>
              <div className="space-y-4">
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
                        onValueChange={setSearchTerm}
                      />
                      <CommandList>
                        <CommandEmpty>
                          No results.
                          <br />
                          <span
                            className="text-blue-600 underline cursor-pointer"
                            onClick={() => handleCreateNewCategory(searchTerm)}
                          >
                            Create new category "{searchTerm}"
                          </span>
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

                <Label htmlFor="part_name">Part Name</Label>
                <Input
                  id="part_name"
                  name="part_name"
                  value={form.part_name}
                  placeholder="Name"
                  onChange={handleChange}
                  className={errors.part_name ? 'border-red-500' : ''}
                />
                {errors.part_name && <p className="text-sm text-red-500">{errors.part_name}</p>}

                <Label htmlFor="part_serial">Model Serial Number</Label>
                <Input
                  id="part_serial"
                  name="part_serial"
                  value={form.part_serial}
                  placeholder="1234567890"
                  onChange={handleChange}
                  className={errors.part_serial ? 'border-red-500' : ''}
                />
                {errors.part_serial && <p className="text-sm text-red-500">{errors.part_serial}</p>}

                <Label htmlFor="stock_threshold">Stock Threshold</Label>
                <Input
                  id="stock_threshold"
                  name="stock_threshold"
                  value={form.stock_threshold}
                  placeholder="10"
                  onChange={handleChange}
                  className={errors.stock_threshold ? 'border-red-500' : ''}
                />
                {errors.stock_threshold && <p className="text-sm text-red-500">{errors.stock_threshold}</p>}
              </div>
            </section>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}