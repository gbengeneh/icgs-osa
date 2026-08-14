import { PortalShell } from '@/components/portal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
