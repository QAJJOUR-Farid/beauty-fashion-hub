"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Save, Shield, Globe } from "lucide-react";

export default function SettingsPage() {
  const [hubName, setHubName] = useState("Beauty & Fashion Viral Hub");
  const [seoTitle, setSeoTitle] = useState("Discover Viral Products");
  const [seoDescription, setSeoDescription] = useState("The best viral beauty and fashion finds from TikTok and Pinterest.");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully! (Note: This is a UI demonstration)");
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Settings</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Configure your Hub and account preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px' }}>
        
        {/* Hub Configuration */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Globe className="logo-accent" size={24} />
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Hub Configuration</h2>
          </div>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Hub Name</label>
              <input 
                type="text" 
                value={hubName} 
                onChange={e => setHubName(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>SEO Meta Title</label>
              <input 
                type="text" 
                value={seoTitle} 
                onChange={e => setSeoTitle(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>SEO Meta Description</label>
              <textarea 
                rows={3} 
                value={seoDescription} 
                onChange={e => setSeoDescription(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }} 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>
              <Save size={18} /> Save Hub Settings
            </button>
          </form>
        </div>

        {/* Security / Admin Access */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Shield className="logo-accent" size={24} />
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Security</h2>
          </div>
          
          <div style={{ padding: '1rem', backgroundColor: '#fff8f1', border: '1px solid #ffe2ca', borderRadius: 'var(--radius-sm)', color: '#9a4e00', fontSize: '0.875rem' }}>
            To change your admin password or email, please update your environment variables or contact support.
          </div>
        </div>

      </div>
    </div>
  );
}
