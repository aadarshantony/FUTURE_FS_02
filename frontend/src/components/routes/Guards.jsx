import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-pulse-glow">
            <Loader2 size={20} className="text-white animate-spin" />
          </div>
          <p className="text-xs font-mono text-slate-600 tracking-widest uppercase">Loading Gatherly...</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <Loader2 size={24} className="text-emerald-500 animate-spin" />
      </div>
    );
  }

  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
