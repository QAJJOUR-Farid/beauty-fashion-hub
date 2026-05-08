"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Link as LinkIcon, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

export default function ProductsManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Beauty");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Beauty");
    setAffiliateLink("");
    setImageFile(null);
    setCurrentImageUrl("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditClick = (product: any) => {
    setEditingId(product._id);
    setTitle(product.title);
    setDescription(product.description);
    setCategory(product.category || "Beauty");
    setAffiliateLink(product.affiliateLink);
    setCurrentImageUrl(product.imageUrl);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && !imageFile) return alert("Please select an image.");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("affiliateLink", affiliateLink);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
      });
      
      const json = await res.json();
      if (json.success) {
        resetForm();
        fetchProducts();
      } else {
        alert("Error: " + json.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setDeleteConfirmId(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Products Manager</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage your viral product catalog.</p>
        </div>
        <button 
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className={`btn ${showForm ? 'btn-outline' : 'btn-primary'}`}
        >
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Product</>}
        </button>
      </header>

      {/* Add/Edit Product Form */}
      {showForm && (
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{editingId ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Product Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="e.g. Viral Lip Gloss" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Description</label>
              <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical', backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)' }} placeholder="Write a catchy hook for the product..." />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)' }}>
                <option value="Beauty">Beauty</option>
                <option value="Fashion">Fashion</option>
                <option value="Skincare">Skincare</option>
                <option value="Haircare">Haircare</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Product Image {editingId ? "(Select new file to change)" : "(Upload from PC)"}
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {editingId && currentImageUrl && !imageFile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={currentImageUrl} alt="Current" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Current Image</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <ImageIcon size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-text-muted)' }} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    required={!editingId}
                    onChange={e => e.target.files && setImageFile(e.target.files[0])} 
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)' }} 
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Affiliate Link (Buy Button URL)</label>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <LinkIcon size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-text-muted)' }} />
                <input type="url" required value={affiliateLink} onChange={e => setAffiliateLink(e.target.value)} placeholder="https://amazon.com/..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary">{editingId ? "Update Product" : "Save Product"}</button>
            </div>

          </form>
        </div>
      )}

      {/* Product List */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No products found. Add one above!</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-text-main)', color: 'var(--color-background)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Image</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Title</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Category</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Stats</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product._id} style={{ borderBottom: i !== products.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <Image 
                          src={product.imageUrl} 
                          alt={product.title} 
                          fill
                          sizes="50px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{product.title}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className="tag tag-trending" style={{ fontSize: '0.7rem' }}>{product.category || "Beauty"}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <span>{product.views} Views</span>
                        <span>{product.clicks} Clicks</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleEditClick(product)} className="btn btn-outline" style={{ padding: '0.5rem' }}><Edit2 size={16} /></button>
                        <button onClick={() => setDeleteConfirmId(product._id)} className="btn btn-outline" style={{ padding: '0.5rem', color: '#e53e3e', borderColor: '#fecaca' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom Delete Modal */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="animate-fade-in" style={{ backgroundColor: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)' }}>
            <div style={{ backgroundColor: '#fff5f5', color: '#e53e3e', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Trash2 size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Delete Product?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Are you sure you want to remove this viral trend? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline" style={{ flex: 1 }}>Keep it</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn btn-primary" style={{ flex: 1, backgroundColor: '#e53e3e', borderColor: '#e53e3e', color: '#fff' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
