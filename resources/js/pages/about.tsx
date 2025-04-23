import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/about',
    },
];

export default function About() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="About PartsTrack" />

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">About CompStock</h1>
          <p className="text-muted-foreground text-sm">
            A modern inventory system crafted for managing items effortlessly.
          </p>
        </div>

        {/* Grid layout for first two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What is CompStock */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is CompStock?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
              <p>
                <strong>CompStock</strong> is a streamlined inventory management platform tailored for stores and hardware warehouses.
              </p>
              <p>
                With real-time updates and a modern tech stack, it simplifies the way you manage, track, and filter your items stock.
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>🔍 Instant Filtering</strong> – Quickly search parts by name, brand, or serial.</li>
                <li><strong>📦 Inventory Monitoring</strong> – Live part count updates and management.</li>
                <li><strong>🌗 Dark Mode</strong> – Modern UI with light/dark theme support.</li>
                <li><strong>⚙️ Laravel + React</strong> – Built with Inertia.js & ShadCN UI.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Credits / Developers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Credits</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="list-disc list-inside space-y-1">
                Developed with ❤️ by the CompStock team.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>UI/UX: TailwindCSS & ShadCN UI</li>
                <li>Frontend: React + Inertia.js</li>
                <li>Backend: Laravel 12</li>
                <li>Deployed with: Vite & modern tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Developers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Frontend Developer</strong>: Pricicive Villocino</li>
                <li><strong>Backend Developer</strong>: Junn Marc Garcia</li>
                <li><strong>Quality Assurance</strong>: Jhon Rey Depacaquibo</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        

        <Separator />

        <div className="text-center text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} CompStock. All rights reserved.
        </div>
      </div>
    </AppLayout>
  );
}
