import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Plus, Clock, Copy, Trash2, Edit2, Download } from 'lucide-react';
import { Navbar, Footer } from '../components';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTranscript, setNewTranscript] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    loadGenerations();
  }, [user]);

  async function loadGenerations() {
    setLoading(true);
    try {
      // Placeholder: in production this would fetch from Supabase with RLS
      const saved = localStorage.getItem(`cf_generations_${user?.id}`);
      if (saved) {
        setGenerations(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load generations', err);
    } finally {
      setLoading(false);
    }
  }

  async function saveGeneration(generation) {
    const updated = [generation, ...generations];
    setGenerations(updated);
    if (user?.id) {
      localStorage.setItem(`cf_generations_${user.id}`, JSON.stringify(updated));
    }
  }

  async function deleteGeneration(id) {
    if (!window.confirm('Delete this generated content?')) return;
    const updated = generations.filter((g) => g.id !== id);
    setGenerations(updated);
    if (user?.id) {
      localStorage.setItem(`cf_generations_${user.id}`, JSON.stringify(updated));
    }
  }

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!newTranscript.trim()) return;
    const generation = {
      id: Date.now().toString(),
      transcript: newTranscript,
      createdAt: new Date().toISOString(),
      outputs: {},
    };
    await saveGeneration(generation);
    setNewTranscript('');
    setShowGenerator(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <Navbar />
      <main className="flex-grow container">
        <div className="dashboard-header mb-md">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}. Manage your generated content here.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowGenerator(true)}
              disabled={loading}
            >
              <Plus size={18} className="mr-1" /> New generation
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => signOut()}
              disabled={loading}
            >
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <span className="spinner" style={{ width: '2rem', height: '2rem' }} /> Loading...
          </div>
        ) : (
          <>
            <div className="dashboard-grid mb-md">
              <div className="stat-card">
                <div className="stat-value">{generations.length}</div>
                <div className="stat-label">Total generations</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">Free</div>
                <div className="stat-label">Current plan</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">3</div>
                <div className="stat-label">Monthly limit</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Your content</h2>
              {generations.length === 0 ? (
                <div className="empty-state">
                  <p>No generations yet. Create your first content pack from a transcript.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                  {generations.map((gen) => (
                    <div key={gen.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                          {new Date(gen.createdAt).toLocaleDateString()}
                        </div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)', display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {gen.transcript.slice(0, 100)}{gen.transcript.length > 100 ? '…' : ''}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link to={`/generation/${gen.id}`} className="btn btn-ghost btn-full" style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}>
                          <FileText size={16} className="mr-1" /> View
                        </Link>
                        <button
                          className="btn btn-ghost btn-full"
                          onClick={() => deleteGeneration(gen.id)}
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: 'var(--color-error)' }}
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {showGenerator && (
              <div className="card mb-lg" style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>New content generation</h2>
                <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Paste your transcript or text</label>
                    <textarea
                      className="textarea-control"
                      value={newTranscript}
                      onChange={(e) => setNewTranscript(e.target.value)}
                      placeholder="Paste your YouTube transcript, meeting notes, article, or any long-form text here..."
                      rows={12}
                      required
                    />
                    <p className="form-hint">ContentFlow AI will generate Instagram captions, YouTube titles & descriptions, LinkedIn posts, X posts, SEO blog articles, short-form scripts, hashtags, and keywords.</p>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                    Generate content pack
                  </button>
                </form>
                <button className="btn btn-ghost" onClick={() => setShowGenerator(false)} style={{ marginTop: '0.5rem' }}>
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
