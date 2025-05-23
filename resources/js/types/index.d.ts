import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface PageProps<T = {}> {
    auth: {
      user: {
        id: number;
        name: string;
        email: string;
      } | null;
    };
    flash: {
      success?: string;
      error?: string;
    };
    [key: string]: any;
  } T;

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string; 
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type Paginated<T> = {
  data: T[];
  total: number;
  from: number | null;
  to: number | null;
  current_page: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
};


