"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Sparkles, Share2, Check, Flame, ShieldCheck } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

interface ProductClientProps {
  product: any;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Tracking view on mount
    let sessionId = localStorage.getItem("hub_session_id");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("hub_session_id", sessionId);
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        eventType: "product_view",
        sessionId
      })
    });
  }, [product._id]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const trackClick = () => {
    let sessionId = localStorage.getItem("hub_session_id") || "unknown";
    
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        eventType: "affiliate_click", 
        sessionId
      })
    });
  };

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <nav className="glass" style={{ padding: '1.5rem 0', marginBottom: '4rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo">
            <Sparkles className="logo-accent" size={24} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>VIRAL<span className="logo-accent">HUB</span></span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/" style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <ArrowLeft size={16} /> Back to Hub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingBottom: '10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '6rem', alignItems: 'start' }}>
          
          {/* Hero Image Section */}
          <div className="animate-fade-in" style={{ position: 'sticky', top: '120px' }}>
            <div style={{ 
              position: 'relative', 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-premium)', 
              backgroundColor: '#fff',
              border: '1px solid var(--color-border)'
            }}>
              <Image 
                src={product.imageUrl && !product.imageUrl.startsWith('/uploads/') 
                  ? product.imageUrl 
                  : "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"} 
                alt={product.title} 
                fill
                priority
                style={{ objectFit: 'cover' }}
                unoptimized={true}
              />
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                <div style={{ 
                   backgroundColor: 'var(--color-badge-bg)', 
                  padding: '0.75rem 1.25rem', 
                  borderRadius: '100px', 
                  fontSize: '0.8rem', 
                  fontWeight: 800, 
                  color: 'var(--color-badge-text)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase'
                }}>
                  <Flame size={16} style={{ color: '#ff4d4d' }} fill="#ff4d4d" /> Viral Trending
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="animate-fade-in delay-100" style={{ padding: '0.5rem 0' }}>
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-accent)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                <ShieldCheck size={18} /> Verified Product
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '2rem' }}>
                {product.title}
              </h1>
            </div>

            {/* HIGH CONVERSION CALL TO ACTION */}
            <div style={{ 
              backgroundColor: 'var(--color-secondary)', 
              padding: '3rem', 
              borderRadius: 'var(--radius-lg)', 
              marginBottom: '4rem',
              border: '1px solid rgba(198, 163, 85, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)' }}>
                  Limited Time Availability
                </p>
                <a 
                  href={product.affiliateLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={trackClick}
                  className="btn btn-viral" 
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem', 
                    borderRadius: '100px',
                  }}
                >
                  Buy Now on Official Store <ExternalLink size={20} />
                </a>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <Check size={16} className="logo-accent" /> Safe Checkout
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <Check size={16} className="logo-accent" /> Verified Link
                  </span>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--color-accent-soft)', filter: 'blur(40px)', opacity: 0.5 }}></div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontWeight: 800 }}>Product Description</h3>
              <p style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', lineHeight: 1.6, fontWeight: 400, letterSpacing: '-0.2px' }}>
                {product.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button 
                onClick={handleCopyLink}
                className="btn btn-outline"
                style={{ flex: 1, borderRadius: '100px', padding: '1.25rem', fontSize: '1rem', fontWeight: 600 }}
              >
                {copied ? <Check size={18} className="logo-accent" /> : <Share2 size={20} />} 
                {copied ? 'Link Copied!' : 'Share This Discovery'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
