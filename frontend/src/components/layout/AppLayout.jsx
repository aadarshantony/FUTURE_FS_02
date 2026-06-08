import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout({ title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-[#0B0F1A]">
      <Sidebar />
      {/* ml-[240px] matches the sidebar width explicitly */}
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '240px' }}>
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto" style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
