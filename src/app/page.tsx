"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, ArrowRight, Play, Search, Mail, Bell } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
          setFilteredProducts(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const categories = ["All", "Beauty", "Fashion", "Skincare", "Haircare", "Accessories"];

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      {/* Premium Navigation */}
      <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1.25rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo">
            <Sparkles className="logo-accent" size={28} />
            <span style={{ fontWeight: 800 }}>VIRAL<span className="logo-accent">HUB</span></span>
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/admin" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Partner Login</Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '8rem 0 2rem', textAlign: 'center' }}>
        <div className="container animate-fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-secondary)', padding: '0.6rem 1.25rem', borderRadius: '100px', border: '1px solid var(--color-accent-soft)', marginBottom: '2.5rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>✨ Curated Viral Discoveries</span>
          </div>
          <h1 style={{ fontSize: '5.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '2rem', letterSpacing: '-1px', color: 'var(--color-text-main)' }}>
            The <span className="logo-accent">Beauty</span> & <br/>Fashion <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Trending</span> List.
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.4rem', maxWidth: '650px', margin: '0 auto 4rem', lineHeight: 1.5, fontWeight: 400 }}>
            Handpicked from the depths of TikTok & Pinterest. <br/> The exact products the world is talking about right now.
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <section style={{ padding: '3rem 0', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', zIndex: 90 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
              <Search size={22} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search viral trends..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', borderRadius: '100px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)', fontSize: '1.1rem', outline: 'none', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease' }}
              />
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            overflowX: 'auto', 
            paddingBottom: '0.5rem',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }} className="hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '0.75rem 1.75rem', 
                  borderRadius: '100px', 
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-border)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-background)',
                  color: selectedCategory === cat ? '#fff' : 'var(--color-text-muted)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Pinterest Grid */}
      <section className="container animate-fade-in delay-200" style={{ padding: '6rem 0 10rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)' }}>
            <TrendingUp size={24} className="logo-accent" /> {selectedCategory === "All" ? "Trending Now" : `${selectedCategory} Trends`}
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            {filteredProducts.length} Discoveries
          </div>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '8rem 2rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <Search size={48} style={{ color: 'var(--color-border)', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No trends found</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid-pinterest">
            {filteredProducts.map(product => (
              <Link href={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="glass-card" style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  backgroundColor: 'var(--color-surface)', 
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  border: '1px solid var(--color-border)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', flexShrink: 0 }}>
                    <Image 
                      src={product.imageUrl} 
                      alt={product.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                      className="product-img"
                    />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--color-badge-bg)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-badge-text)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <Play size={12} fill="currentColor" /> WATCH VIRAL
                    </div>
                  </div>
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-accent)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <TrendingUp size={14} /> Viral Pick
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.5px', color: 'var(--color-text-main)' }}>
                      {product.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontWeight: 400 }}>
                      {product.description}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      <span>Discover Details</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Premium Newsletter */}
      <section style={{ backgroundColor: 'var(--color-secondary)', padding: '10rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'var(--color-accent-soft)', borderRadius: '50%', color: 'var(--color-accent)', marginBottom: '2rem' }}>
            <Bell size={32} />
          </div>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Join the Viral List.</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '3rem', lineHeight: 1.6 }}>
            Be the first to know when a new beauty trend drops. <br/> No spam, just the vibes you need.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{ padding: '1.25rem 2rem', borderRadius: '100px', border: '1px solid var(--color-border)', width: '100%', maxWidth: '350px', outline: 'none', fontSize: '1rem' }}
            />
            <button className="btn btn-primary" style={{ padding: '0 2.5rem', borderRadius: '100px' }}>
              Subscribe <Mail size={18} />
            </button>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--color-background)', borderTop: '1px solid var(--color-border)', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link href="/" className="logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <Sparkles className="logo-accent" size={28} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>VIRAL<span className="logo-accent">HUB</span></span>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Link href="/">Home</Link>
            <Link href="/admin">Partner Login</Link>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>&copy; 2024 Viral Hub. Handpicked for you with love.</p>
        </div>
      </footer>

      <style jsx global>{`
        .product-img:hover {
          transform: scale(1.05);
        }
        .glass-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: var(--color-accent);
        }
        .logo-accent {
          color: var(--color-accent);
        }
      `}</style>
    </main>
  );
}
