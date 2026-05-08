"use client";

import Link from "next/link";
import { LayoutDashboard, Package, Settings, LogOut, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <Link href="/" className="logo">
            <Sparkles className="logo-accent" size={24} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Hub Admin</span>
          </Link>
          <ThemeToggle />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          <Link 
            href="/admin" 
            className="btn btn-outline" 
            style={{ 
              justifyContent: 'flex-start', 
              border: 'none', 
              backgroundColor: isActive('/admin') ? 'var(--color-accent)' : 'transparent', 
              color: isActive('/admin') ? '#fff' : 'var(--color-text-muted)', 
              fontWeight: isActive('/admin') ? 700 : 500,
              boxShadow: isActive('/admin') ? '0 8px 20px var(--color-accent-soft)' : 'none',
              transform: isActive('/admin') ? 'translateX(4px)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className="btn btn-outline" 
            style={{ 
              justifyContent: 'flex-start', 
              border: 'none', 
              backgroundColor: isActive('/admin/products') ? 'var(--color-accent)' : 'transparent', 
              color: isActive('/admin/products') ? '#fff' : 'var(--color-text-muted)', 
              fontWeight: isActive('/admin/products') ? 700 : 500,
              boxShadow: isActive('/admin/products') ? '0 8px 20px var(--color-accent-soft)' : 'none',
              transform: isActive('/admin/products') ? 'translateX(4px)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Package size={20} /> Products
          </Link>
          <Link 
            href="/admin/settings" 
            className="btn btn-outline" 
            style={{ 
              justifyContent: 'flex-start', 
              border: 'none', 
              backgroundColor: isActive('/admin/settings') ? 'var(--color-accent)' : 'transparent', 
              color: isActive('/admin/settings') ? '#fff' : 'var(--color-text-muted)', 
              fontWeight: isActive('/admin/settings') ? 700 : 500,
              boxShadow: isActive('/admin/settings') ? '0 8px 20px var(--color-accent-soft)' : 'none',
              transform: isActive('/admin/settings') ? 'translateX(4px)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>

        <Link href="/admin/login" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', color: '#e53e3e', marginTop: 'auto', fontWeight: 600 }}>
          <LogOut size={20} /> Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
