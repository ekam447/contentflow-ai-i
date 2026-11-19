import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Home, LayoutDashboard, Settings } from 'lucide-react';

export function Navbar() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          Content<span className="accent">Flow</span> AI
        </Link>

        <div className="nav-links">
          <Link to="/" className={user ? '' : 'btn btn-ghost'}>
            <Home size={18} className="mr-1" /> Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="btn btn-ghost"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard size={18} className="mr-1" /> Dashboard
              </Link>
              <Link
                to="/settings"
                className="btn btn-ghost"
                onClick={() => navigate('/settings')}
              >
                <Settings size={18} className="mr-1" /> Settings
              </Link>
              <button
                className="btn btn-ghost"
                onClick={handleSignOut}
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : <LogOut size={18} className="mr-1" />}
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
