import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Generation } from './pages/Generation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [supabaseReady, setSupabaseReady] = useState(false);

  useEffect(() => {
    // Brief check so Supabase client is initialized before routing
    setSupabaseReady(true);
  }, []);

  if (!supabaseReady) {
    return null;
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generation/:id"
          element={
            <ProtectedRoute>
              <Generation />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
