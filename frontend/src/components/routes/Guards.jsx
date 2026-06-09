import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircleNotch } from '@phosphor-icons/react';

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center font-['Manrope',sans-serif]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-white border-2 border-[#18181B] flex items-center justify-center shadow-[4px_4px_0px_0px_#18181B]">
          <CircleNotch size={24} weight="bold" className="text-[#FF4500] animate-spin" />
        </div>
        <p className="text-[10px] font-bold text-[#71717A] tracking-[0.2em] uppercase">Loading Gatherly...</p>
      </div>
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function PublicRoute() {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
