import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout({ title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F4F5] font-['Manrope',sans-serif] text-[#09090B] selection:bg-[#FF4500] selection:text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content — on lg+ it shifts right to make room for the fixed sidebar */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[264px]">
        <Topbar title={title} subtitle={subtitle} onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}