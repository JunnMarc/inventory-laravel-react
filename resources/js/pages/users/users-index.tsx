import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps, BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Frown, File, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: '/users' }];

export default function UsersIndex() {
  const { props } = usePage<PageProps<{ users: any; filters: any }>>();
  const { users, filters, auth } = props;  // Get auth from props to get logged-in user
  
  const loggedInUserId = auth.user?.id;  // Logged-in user's ID

  const [form, setForm] = useState({
    name: filters.name || '',
    email: filters.email || '',
    role: filters.role || '',
  });

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('users.index'), form, {
      preserveScroll: true,
      preserveState: true,
      only: ['users'],
    });
  };

  const handleClear = () => {
    setForm({ name: '', email: '', role: '' });
    router.get(route('users.index'), {}, {
      preserveScroll: true,
      preserveState: true,
      only: ['users'],
    });
  };

  const handleAdd = () => router.visit(route('users.create'));

  const toggleSelect = (id: number) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedUsers.length === users.data.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.data.map((u: User) => u.id));
    }
  };

  const handleDelete = () => {
    router.post(route('users.bulk-delete'), { ids: selectedUsers }, {
      onSuccess: () => {
        setSelectedUsers([]);
        setShowDeleteDialog(false);
      },
      preserveScroll: true,
      preserveState: true,
      only: ['users'],
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="p-4 space-y-6 bg-white dark:bg-neutral-950">
        {/* Top Toolbar */}
        <div className="flex items-center space-x-4 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white"
            onClick={handleAdd}
          >
            <File className="h-4 w-4" />
            <span>New</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
            disabled={selectedUsers.length === 0}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Table Section */}
          <section className="flex-1 bg-white dark:bg-neutral-900 rounded shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 pt-4 pb-2">
              <h1 className="text-xl font-semibold text-neutral-800 dark:text-white">Users</h1>
            </div>

            <div className="overflow-auto min-h-[300px] max-h-[300px]">
              {users.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground space-y-4">
                  <Frown className="h-10 w-10 text-yellow-500" />
                  <p className="text-lg font-medium">No users found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <input
                          type="checkbox"
                          onChange={selectAll}
                          checked={selectedUsers.length === users.data.length && users.data.length > 0}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.data.map((user: User) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleSelect(user.id)}
                            disabled={user.id === loggedInUserId}
                          />
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <select
                            value={user.role}
                            onChange={(e) => {
                              const newRole = e.target.value;
                              router.post(
                                route('users.update-role', user.id),
                                { role: newRole },
                                {
                                  preserveScroll: true,
                                  preserveState: true,
                                  only: ['users'],
                                }
                              );
                            }}
                            className="border border-neutral-300 dark:border-neutral-700 bg-white disabled:text-gray-400 dark:bg-neutral-800 text-sm rounded px-2 py-1"
                            disabled={user.id === loggedInUserId} // Disable if the employee is logged in
                          >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                          </select>
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => router.visit(route('users.edit', user.id))}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Pagination */}
            <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-sm flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>
                Showing {users.from} to {users.to} of {users.total} entries
              </span>
              <div className="flex items-center gap-2">
                {users.links.map((link: any, i: number) => (
                  <button
                    key={i}
                    className={`px-2 py-1 rounded text-sm ${link.active
                      ? 'bg-primary text-white dark:bg-neutral-800 dark:text-neutral-300'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'} disabled:opacity-50`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    disabled={!link.url}
                    onClick={() =>
                      link.url &&
                      router.visit(link.url, {
                        preserveScroll: true,
                        preserveState: true,
                        only: ['users'],
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <aside className="w-full max-w-xs bg-white dark:bg-neutral-900 rounded shadow-sm p-4">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Filter</h2>
            <form onSubmit={handleSearch} className="space-y-4 text-sm">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                  Email
                </label>
                <input
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="role" className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                  Role
                </label>
                <select
                  id="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white rounded px-2 py-1 text-sm"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button type="submit" className="w-full">
                  Search
                </Button>
                <Button type="button" variant="secondary" onClick={handleClear} className="w-full">
                  Clear
                </Button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
