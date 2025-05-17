import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import type { User } from '@/types';
import {
    BookOpen,
    ChevronDown,
    Folder,
    Info,
    LayoutGrid,
    Package,
    Users,
    ShoppingCart,
    Trash2,
    PanelBottomOpen 
  } from 'lucide-react';
import AppLogo from './app-logo';
import { ZiggyVue} from 'ziggy-js'; // path may vary depending on your project
console.log(ZiggyVue);

type InertiaProps = {
  auth: {
    user: User;
  };
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    { 
        title: 'Product', 
        href: route('parts.index'), 
        icon: Package },
    { 
        title: 'Categories', 
        href: route('categories.index'), 
        icon: Folder },
    { 
        title: 'Orders', 
        href:route('orders.index'), 
        icon: ShoppingCart },
    { 
        title: 'Inventory out', 
        href:route('stock-out.index'), 
        icon: PanelBottomOpen },
    { 
        title: 'System Users', 
        href: route('users.index'), 
        icon: Users },
    {
        title: 'About',
        href: route('about'),
        icon: Info,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/JunnMarc/inventory-laravel-react',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://github.com/JunnMarc/inventory-laravel-react/blob/main/README.md',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage<InertiaProps>();
    const user = props.auth?.user;
    const filteredNavItems = mainNavItems.filter(item => {
        if (item.title === 'System Users' && user.role !== 'manager') {
            return false;
        }
        return true;
    });
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
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
