import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Navbar, Footer } from '../components';

export function Login() {
  const { signIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setSubmitting(true);
    try {
      const { error: err } = await signIn({ email, password });
      if (err) {
        setError(err.message || 'Login failed. Please try again.');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container section">
          <div style={{ maxWidth: '450px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>Sign in</h2>
            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2rem' }}>Welcome back to ContentFlow AI</p>

            {error && (
              <div className="alert alert-error" role="alert">{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={submitting || authLoading}>
                {submitting ? (
  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <span className="spinner" style={{ width: '1rem', height: '1rem' }} />
    Signing in...
  </span>
) : (
  <span>Sign in</span>
)}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create one</Link>
            </p>
            <p style={{ textAlign: 'center', marginTop: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
              <Link to="/reset-password" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Forgot password?</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
