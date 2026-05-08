"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-main)',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        backgroundColor: 'rgba(255, 77, 77, 0.1)', 
        padding: '2rem', 
        borderRadius: '50%',
        marginBottom: '2rem'
      }}>
        <AlertTriangle size={50} style={{ color: '#ff4d4d' }} />
      </div>
      
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 800, 
        letterSpacing: '-1px',
        marginBottom: '1rem'
      }}>
        Something went wrong
      </h1>
      
      <p style={{ 
        maxWidth: '500px', 
        fontSize: '1.1rem', 
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
        marginBottom: '3rem'
      }}>
        We encountered an unexpected error while loading this discovery. 
        Our editors have been notified.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => reset()}
          className="btn btn-outline" 
          style={{ borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <RefreshCw size={18} /> Try Again
        </button>
        
        <Link href="/" className="btn btn-viral" style={{ borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Home size={18} /> Back to Home
        </Link>
      </div>
      
      <div style={{ marginTop: '4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', opacity: 0.5 }}>
        Error Code: {error.digest || 'Internal Server Error'}
      </div>
    </div>
  );
}
