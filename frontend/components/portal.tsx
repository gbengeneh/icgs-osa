"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Award,
  CalendarDays,
  ChevronDown,
  CircleUserRound,
  CreditCard,
  FileImage,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  MessageCircle,
  Settings,
  ShieldCheck,
  UserCog,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { mediaUrl } from "@/lib/api";

const memberLinks = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/dashboard/profile", "My profile", CircleUserRound],
  ["/dashboard/directory-privacy", "Directory privacy", UsersRound],
  ["/dashboard/set", "My set directory", GraduationCap],
  ["/dashboard/dues", "Dues & payments", CreditCard],
  ["/events", "Events", CalendarDays],
  ["/news", "News & updates", Newspaper],
] as const;
const adminLinks = [
  ["/admin", "Overview", LayoutDashboard],
  ["/admin/profile", "Admin profile", CircleUserRound],
  ["/admin/my-set", "My set information", GraduationCap],
  ["/admin/members", "Members", UsersRound],
  ["/admin/dues", "Dues & payments", CreditCard],
  ["/admin/sets", "Graduating sets", GraduationCap],
  ["/admin/set-admins", "Set administrators", UserCog],
  ["/admin/administrators", "Super administrators", ShieldCheck],
  ["/admin/exceptional-members", "Exceptional members", Award],
  ["/admin/excos", "Manage EXCOs", ShieldCheck],
  ["/admin/gallery", "Event gallery", FileImage],
  ["/admin/content", "Manage events", CalendarDays],
  ["/admin/news", "Publish news", Newspaper],
  ["/admin/settings", "Settings", Settings],
] as const;

export function PortalShell({
  children,
  admin = false,
  setAdmin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
  setAdmin?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const setYear = user?.graduating_year ?? "Unassigned";
  const setAdminLinks = [
    ["/set-admin", "Set overview", LayoutDashboard],
    ["/set-admin/members", `${setYear} Set members`, UsersRound],
    ["/set-admin/dues", "Set dues", CreditCard],
    ["/set-admin/excos", "Set EXCOs", ShieldCheck],
    ["/set-admin/admins", "Admin team", UserCog],
    ["/set-admin/set", "View set directory", GraduationCap],
    ["/set-admin/community", "Community groups", MessageCircle],
    ["/events", "Events", CalendarDays],
  ] as const;
  const links = admin ? adminLinks : setAdmin ? setAdminLinks : memberLinks;
  const authorized =
    !!user &&
    (admin
      ? user.role === "super_admin"
      : setAdmin
        ? user.role === "coordinator"
        : ["member", "coordinator", "super_admin"].includes(user.role));
  useEffect(() => {
    if (!loading && !authorized) router.replace(user ? "/dashboard" : "/login");
  }, [authorized, loading, router, user]);
  if (loading || !authorized)
    return (
      <div className="portal-loading">
        <span />
        <p>{loading ? "Loading your workspace..." : "Redirecting..."}</p>
      </div>
    );
  const roleName = admin
    ? "Super Admin"
    : setAdmin
      ? `${setYear} Set Admin`
      : "Member Portal";
  const userName = user.name;
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className={`portal-shell ${admin || setAdmin ? "admin-portal" : ""}`}>
      <aside className={`portal-sidebar ${open ? "is-open" : ""}`}>
        <div className="portal-brand">
          <Image
            src="/icgs-osa-logo.png"
            alt="ICGS-OSA crest"
            width={48}
            height={48}
          />
          <span>
            <b>ICGS-OSA</b>
            <small>{roleName}</small>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <nav className="portal-nav" aria-label="Portal navigation">
          <span className="portal-nav-label">Workspace</span>
          {links.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}
        </nav>
        <button className="portal-user" onClick={logout}>
          <span className={`portal-avatar ${user.photo_url ? "has-photo" : ""}`}>{user.photo_url ? <img src={mediaUrl(user.photo_url)} alt={userName} /> : initials}</span>
          <span>
            <b>{userName}</b>
            <small>
              {admin
                ? "All sets · Full access"
                : setAdmin
                  ? `${setYear} Set · Scoped access`
                  : `${setYear} Set · View access`}
            </small>
          </span>
          <LogOut size={17} />
        </button>
      </aside>
      <div className="portal-main">
        <header className="portal-topbar">
          <button
            className="portal-menu"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </button>
          <div>
            <span className="portal-mobile-title">{roleName}</span>
          </div>
          {setAdmin && (
            <span className="scope-badge">
              <ShieldCheck size={14} /> Scoped to {setYear} Set
            </span>
          )}
          <div className="portal-top-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
              <i />
            </button>
            <div className="top-user">
              <span className={`portal-avatar small ${user.photo_url ? "has-photo" : ""}`}>{user.photo_url ? <img src={mediaUrl(user.photo_url)} alt={userName} /> : initials}</span>
              <span>
                <b>{userName}</b>
                <small>{roleName}</small>
              </span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>
        <main className="portal-content">{children}</main>
      </div>
    </div>
  );
}
export function StatCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ElementType;
  tone?: string;
}) {
  return (
    <article className="portal-stat">
      <span className={`stat-icon ${tone}`}>
        <Icon />
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </article>
  );
}
export function PageHeading({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="portal-heading">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {action}
    </div>
  );
}
