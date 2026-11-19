import { useState, useEffect, useParams } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Copy, Edit2, Download, Trash2, FileText } from 'lucide-react';
import { Navbar, Footer } from '../components';

export function Generation() {
  const { id } = useParams();
  const { user } = useAuth();
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [outputKey, setOutputKey] = useState(null);

  useEffect(() => {
    loadGeneration();
  }, [id, user]);

  async function loadGeneration() {
    setLoading(true);
    try {
      const saved = localStorage.getItem(`cf_generations_${user?.id}`);
      if (saved) {
        const generations = JSON.parse(saved);
        const gen = generations.find((g) => g.id === id);
        setGeneration(gen || null);
      }
    } catch (err) {
      console.error('Failed to load generation', err);
    } finally {
      setLoading(false);
    }
  }

  const outputTypes = [
    { key: 'instagram', label: 'Instagram Caption', icon: <span style={{ fontSize: '1.25rem' }}>📷</span> },
    { key: 'youtube', label: 'YouTube Title & Description', icon: <span style={{ fontSize: '1.25rem' }}>▶️</span> },
    { key: 'linkedin', label: 'LinkedIn Post', icon: <span style={{ fontSize: '1.25rem' }}>💼</span> },
    { key: 'x', label: 'X/Twitter Post', icon: <span style={{ fontSize: '1.25rem' }}>🐦</span> },
    { key: 'blog', label: 'SEO Blog Article', icon: <span style={{ fontSize: '1.25rem' }}>📝</span> },
    { key: 'script', label: 'Short-form Video Script', icon: <span style={{ fontSize: '1.25rem' }}>🎬</span> },
    { key: 'hashtags', label: 'Hashtags & Keywords', icon: <span style={{ fontSize: '1.25rem' }}>#</span> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <Navbar />
        <main className="flex-grow container">
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <span className="spinner" style={{ width: '2rem', height: '2rem' }} /> Loading content...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!generation) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <Navbar />
        <main className="flex-grow container">
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Content not found</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>This generation does not exist or you don't have access to it.</p>
            <Link to="/dashboard" className="btn btn-primary mt-3">Back to dashboard</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <Navbar />
      <main className="flex-grow container">
        <div className="dashboard-header mb-md">
          <Link to="/dashboard" className="btn btn-ghost mb-3">
            <FileText size={18} className="mr-1" /> Back to dashboard
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                if (outputKey && generation.outputs?.[outputKey]) {
                  navigator.clipboard.writeText(generation.outputs[outputKey]);
                }
              }}
              disabled={!outputKey}
            >
              <Copy size={16} className="mr-1" /> Copy
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                const content = generation.outputs?.[outputKey] || generation.transcript;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `contentflow-${outputKey || 'transcript'}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download size={16} className="mr-1" /> Download
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                if (window.confirm('Delete this content?')) {
                  const saved = localStorage.getItem(`cf_generations_${user?.id}`);
                  if (saved) {
                    const generations = JSON.parse(saved).filter((g) => g.id !== id);
                    localStorage.setItem(`cf_generations_${user?.id}`, JSON.stringify(generations));
                  }
                  window.location.href = '/dashboard';
                }
              }}
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </button>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="card mb-md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                  {new Date(generation.createdAt).toLocaleDateString()}
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)' }}>
                  Source transcript
                </h2>
              </div>
              {editing ? (
                <button className="btn btn-ghost" onClick={() => setEditing(false)}>
                  Cancel edit
                </button>
              ) : (
                <button className="btn btn-outline" onClick={() => setEditing(true)}>
                  <Edit2 size={16} className="mr-1" /> Edit transcript
                </button>
              )}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <textarea
                className="textarea-control"
                value={editing ? generation.transcript : generation.transcript}
                onChange={(e) => {
                  if (editing) {
                    setGeneration({ ...generation, transcript: e.target.value });
                  }
                }}
                readOnly={!editing}
                rows={8}
              />
            </div>
            {editing && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => {
                  setEditing(false);
                  const saved = localStorage.getItem(`cf_generations_${user?.id}`);
                  if (saved) {
                    const generations = JSON.parse(saved).map((g) =>
                      g.id === id ? { ...generation } : g
                    );
                    localStorage.setItem(`cf_generations_${user?.id}`, JSON.stringify(generations));
                  }
                }}>Save</button>
              </div>
            )}
          </div>

          <div className="mb-md">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Generated content
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {outputTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setOutputKey(type.key)}
                  className={`btn btn-ghost ${outputKey === type.key ? 'bg-primary text-white border-primary' : ''} px-3 py-1.5 text-sm rounded`}
                  style={{
                    backgroundColor: outputKey === type.key ? 'var(--color-primary)' : 'transparent',
                    color: outputKey === type.key ? '#ffffff' : 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>

            {outputKey && generation.outputs?.[outputKey] ? (
              <div className="card mb-md">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{outputTypes.find((t) => t.key === outputKey)?.label}</h3>
                  <button
                    className="btn btn-ghost text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(generation.outputs[outputKey]);
                    }}
                  >
                    <Copy size={14} className="mr-1" /> Copy
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <textarea
                    className="textarea-control"
                    value={generation.outputs[outputKey]}
                    readOnly
                    rows={10}
                  />
                </div>
              </div>
            ) : !outputKey && (
              <div className="empty-state">
                <p>Select a content type above to view the generated output.</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  AI generation is coming in the next development phase. For now, you can save and manage your transcripts here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


