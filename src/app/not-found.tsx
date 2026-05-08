import Link from "next/link";
import { Sparkles, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
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
      <Sparkles className="logo-accent animate-pulse" size={60} style={{ marginBottom: '2rem' }} />
      
      <h1 style={{ 
        fontSize: 'clamp(3rem, 10vw, 6rem)', 
        fontWeight: 800, 
        letterSpacing: '-2px',
        lineHeight: 1,
        marginBottom: '1rem'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 500, 
        textTransform: 'uppercase', 
        letterSpacing: '4px',
        color: 'var(--color-accent)',
        marginBottom: '3rem'
      }}>
        Discovery Not Found
      </h2>
      
      <p style={{ 
        maxWidth: '500px', 
        fontSize: '1.1rem', 
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
        marginBottom: '4rem'
      }}>
        The viral trend you're looking for might have moved or is no longer available. 
        Let's get you back to the latest discoveries.
      </p>
      
      <Link href="/" className="btn btn-viral" style={{ borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ArrowLeft size={20} /> Back to Hub
      </Link>
      
      <div style={{ marginTop: '6rem', opacity: 0.3 }}>
        <Search size={100} strokeWidth={1} />
      </div>
    </div>
  );
}
