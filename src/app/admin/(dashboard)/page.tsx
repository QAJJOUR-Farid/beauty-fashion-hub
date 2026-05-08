"use client";

import { useEffect, useState } from "react";
import { Users, Eye, MousePointerClick, Activity, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading dashboard analytics...</div>;

  const stats = [
    { label: "Total Unique Visitors", value: data?.overview?.totalVisitors || 0, icon: Users },
    { label: "Total Product Views", value: data?.overview?.totalViews || 0, icon: Eye },
    { label: "Total Clicks (CTAs)", value: data?.overview?.totalClicks || 0, icon: MousePointerClick },
    { label: "Avg CTR", value: data?.overview?.ctr || "0%", icon: Activity },
  ];

  const topProducts = data?.topProducts || [];

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Welcome back. Here's how your viral products are performing.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{stat.label}</span>
              <div style={{ backgroundColor: '#f3f4f6', padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--color-accent)' }}>
                <stat.icon size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{stat.value.toLocaleString()}</div>
            <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 500 }}>
              Live Data
            </div>
          </div>
        ))}
      </div>

      {/* Top Trending Table */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <TrendingUp size={20} className="logo-accent" /> Top Trending Products
          </h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-text-main)', color: 'var(--color-background)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, width: '80px' }}>Product</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Views</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Clicks</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Viral Score 🔥</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No products yet. Go to the Products tab to add some!
                  </td>
                </tr>
              ) : topProducts.map((product: any, i: number) => (
                <tr key={i} style={{ borderBottom: i !== topProducts.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <td style={{ padding: '0.75rem 1.5rem' }}>
                    <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                      <Image 
                        src={product.imageUrl} 
                        alt="" 
                        fill
                        sizes="50px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{product.title}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{product.views.toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{product.clicks.toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-accent)' }}>{product.viralScore.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
