import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ChevronDown,
    Folder,
    Info,
    LayoutGrid,
    Package,
    Users,
    ShoppingCart,
    Trash2
  } from 'lucide-react';
import AppLogo from './app-logo';
import { ZiggyVue} from 'ziggy-js'; // path may vary depending on your project
console.log(ZiggyVue);

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    { 
        title: 'Parts', 
        href: route('parts.index'), 
        icon: Package },
    { 
        title: 'Categories', 
        href: route('categories.index'), 
        icon: Folder },
    { 
        title: 'System Users', 
        href: route('dashboard'), 
        icon: Users },
    { 
        title: 'Orders', 
        href:route('dashboard'), 
        icon: ShoppingCart },
    {
        title: 'About',
        href: route('about'),
        icon: Info,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
