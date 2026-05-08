"use client";

import { useState } from "react";
import { Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (json.success) {
        router.push("/admin");
      } else {
        setError(json.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf9f8' }}>
      <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '420px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <Sparkles className="logo-accent" size={28} />
            <span style={{ fontSize: '1.5rem' }}>Beauty<span className="logo-accent">&</span>Fashion</span>
          </Link>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Portal</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#fff5f5', color: '#e53e3e', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 500, border: '1px solid #feb2b2' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div> : <><Lock size={18} /> Sign In</>}
          </button>
        </form>

      </div>
    </div>
  );
}
