import { PortalShell } from '@/components/portal';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell admin>{children}</PortalShell>;
}
