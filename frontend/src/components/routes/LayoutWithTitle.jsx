import { useLocation } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';

const PAGE_META = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your pipeline' },
  '/leads': { title: 'Leads', subtitle: 'Manage your lead pipeline' },
  '/analytics': { title: 'Analytics', subtitle: 'Insights and performance metrics' },
  '/activity': { title: 'Activity', subtitle: 'Audit trail and recent events' },
};

export function LayoutWithTitle() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || { title: 'Gatherly', subtitle: '' };
  return <AppLayout title={meta.title} subtitle={meta.subtitle} />;
}
