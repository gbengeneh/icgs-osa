"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const links = [
  ["/", "Home"],
  ["/history", "Our History"],
  ["/excos", "Meet Our EXCOs"],
  ["/events", "Events"],
  ["/news", "News"],
  ["/gallery", "Gallery"],
  ["/members", "Alumni Directory"],
  ["/exceptional-members", "Exceptional Members"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="nav shell">
        <Link href="/" className="brand">
          <Image
            src="/icgs-osa-logo.png"
            alt="ICGS-OSA crest"
            width={62}
            height={62}
          />
          <span>
            <b>ICGS-OSA</b>
            <small>Old Students Association</small>
          </span>
        </Link>
        <nav>
          {links.map(([h, l]) => (
            <Link key={h} href={h} className={pathname === h ? "active" : ""}>
              {l}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/login" className="text-link">
            Sign in
          </Link>
          <Link href="/register" className="button small">
            Join the Alumni
          </Link>
        </div>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-nav">
          {links.map(([h, l]) => (
            <Link onClick={() => setOpen(false)} key={h} href={h} className={pathname === h ? "active" : ""}>
              {l}
            </Link>
          ))}
          <Link href="/login">Sign in</Link>
          <Link className="button" href="/register">
            Join the Alumni
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <div className="brand light">
            <Image
              src="/icgs-osa-logo.png"
              alt="Crest"
              width={70}
              height={70}
            />
            <span>
              <b>ICGS-OSA</b>
              <small>Together again. Forward always.</small>
            </span>
          </div>
          <p>
            Preserving our heritage, reconnecting generations and building a
            stronger future for our alma mater.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          {links.slice(1).map(([h, l]) => (
            <Link key={h} href={h}>
              {l}
            </Link>
          ))}
        </div>
        <div>
          <h4>Membership</h4>
          <Link href="/register">Become a member</Link>
          <Link href="/login">Member sign in</Link>
          <Link href="/events">Upcoming events</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            <MapPin size={16} /> Igbotako, Ondo State, Nigeria
          </p>
          <p>
            <Mail size={16} /> hello@icgsosa.org
          </p>
          <p>
            <Phone size={16} /> +234 000 000 0000
          </p>
        </div>
      </div>
      <div className="shell copyright">
        <span>© 2026 ICGS-OSA. All rights reserved.</span>
        <span>Powered by <a href="https://globivance.com" target="_blank" rel="noopener noreferrer">Globivance Systems</a></span>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="page-hero">
      <div className="orb one" />
      <div className="page-hero-pattern" />
      <div className="shell reveal page-hero-inner">
        <span className="eyebrow light-text">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <span className="page-hero-mark">ICGS · 1976</span>
      </div>
    </section>
  );
}
export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="arrow-link" href={href}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
