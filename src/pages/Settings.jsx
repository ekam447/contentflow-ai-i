import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { Navbar, Footer } from '../components';

export function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <Navbar />
      <main className="flex-grow container section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Account settings</h1>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <button
              className={`btn btn-ghost ${tab === 'profile' ? 'text-primary font-semibold border-b-2 border-primary pb-1' : ''}`}
              onClick={() => setTab('profile')}
            >
              Profile
            </button>
            <button
              className={`btn btn-ghost ${tab === 'security' ? 'text-primary font-semibold border-b-2 border-primary pb-1' : ''}`}
              onClick={() => setTab('security')}
            >
              Security
            </button>
            <button
              className={`btn btn-ghost ${tab === 'subscription' ? 'text-primary font-semibold border-b-2 border-primary pb-1' : ''}`}
              onClick={() => setTab('subscription')}
            >
              Subscription
            </button>
          </div>

          {tab === 'profile' && (
            <div className="card mb-md">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={20} /> Profile
              </h2>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={user?.email || ''}
                  readOnly
                />
                <p className="form-hint">Email cannot be changed from this screen yet.</p>
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="card mb-md">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} /> Security
              </h2>
              <div className="form-group">
                <label className="form-label">Change password</label>
                <p className="form-hint">Use the forgot password flow on the sign-in page to reset your password securely.</p>
                <Link to="/login" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                  Sign out and reset password
                </Link>
              </div>
            </div>
          )}

          {tab === 'subscription' && (
            <div className="card mb-md">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={20} /> Subscription
              </h2>
              <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fcd34d' }}>
                <p style={{ color: '#92400e', fontSize: '0.9375rem', margin: 0 }}>
                  You are on the <strong>Free plan</strong>. Upgrade to Creator Pro (₹499/month) for 30 generations per month, brand voice, and history.
                </p>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '1rem' }}>
                Payment integration is being prepared. No charges will be applied without a verified payment flow.
              </p>
            </div>
          )}

          {message && (
            <div className="alert alert-success" role="alert" style={{ marginTop: '1rem' }}>
              {message}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
