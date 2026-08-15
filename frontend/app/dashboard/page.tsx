'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, CalendarCheck2, CheckCircle2, GraduationCap, MapPin, MessageCircle, ReceiptText, Send, UserRoundCheck } from 'lucide-react';
import { PageHeading, StatCard } from '@/components/portal';
import { useAuth } from '@/components/auth-provider';
import { api, ApiUser, Paginated } from '@/lib/api';
import type { PublicEvent } from '@/app/events/page';

type Activity = { id: number; title: string; description?: string | null; type: string; occurred_at: string };
type Profile = ApiUser & { activities?: Activity[] };
type DueSummary = { verified_paid: number; balance: number };
type SetCommunity = { id: number; year: number; description: string | null; whatsapp_url: string | null; telegram_url: string | null };

export default function MemberDashboard() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dues, setDues] = useState<DueSummary[]>([]);
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [community, setCommunity] = useState<SetCommunity | null>(null);

  useEffect(() => {
    if (!token) return;
    api<Profile>('/profile', {}, token).then(setProfile).catch(() => undefined);
    api<DueSummary[]>('/dues', {}, token).then(setDues).catch(() => undefined);
    api<Paginated<PublicEvent>>('/events').then(result => setEvents(result.data)).catch(() => undefined);
    api<SetCommunity>('/my-set', {}, token).then(setCommunity).catch(() => undefined);
  }, [token]);

  const member = profile ?? user;
  const initials = member?.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'IC';
  const completion = useMemo(() => {
    if (!member) return 0;
    const fields = [member.name, member.email, member.graduating_year, member.phone, member.occupation, member.company, member.location, member.bio];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [member]);
  const outstanding = dues.reduce((total, due) => total + Number(due.balance || 0), 0);
  const contributed = dues.reduce((total, due) => total + Number(due.verified_paid || 0), 0);
  const upcoming = events[0];

  if (!member) return <div className="empty-state">Loading your dashboard...</div>;

  return <>
    <PageHeading eyebrow={new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} title={`Welcome back, ${member.name.split(' ')[0]}.`} copy="Here is what is happening across your alumni community." action={<Link className="portal-primary" href="/events">Explore events <ArrowUpRight size={17}/></Link>}/>
    <section className="portal-stats">
      <StatCard label="Profile strength" value={`${completion}%`} note={completion < 100 ? 'Complete your member profile' : 'Your profile is complete'} icon={UserRoundCheck}/>
      <StatCard label="Upcoming events" value={String(events.length)} note={upcoming?.title || 'No published events'} icon={CalendarCheck2} tone="gold"/>
      <StatCard label="Verified contributions" value={formatCurrency(contributed)} note={outstanding ? `${formatCurrency(outstanding)} outstanding` : 'No outstanding dues'} icon={ReceiptText} tone="green"/>
    </section>
    <section className="member-dashboard-grid">
      <article className="portal-card profile-summary">
        <div className="profile-banner"><span className="large-avatar">{initials}</span><span className="verified"><CheckCircle2 size={14}/> {member.status} member</span></div>
        <div className="profile-copy"><small>MEMBER ID · ICGS-OSA/{member.id}</small><h2>{member.name}</h2><span className="set-pill"><GraduationCap size={16}/>{member.graduating_year ? `Class of ${member.graduating_year}` : 'Set not assigned'}</span><div className="profile-detail"><BriefcaseBusiness/><span><small>Current position</small><b>{member.occupation || 'Not provided'}</b><p>{member.company || 'Organisation not provided'}</p></span></div><div className="profile-detail"><MapPin/><span><small>Current location</small><b>{member.location || 'Not provided'}</b></span></div><div className="profile-progress"><span><b>Profile completion</b><small>{completion}%</small></span><i><em style={{width: `${completion}%`}}/></i></div><Link href="/dashboard/profile">Complete your profile <ArrowUpRight size={16}/></Link></div>
      </article>
      <article className="portal-card activity-card"><div className="card-title"><div><span>YOUR JOURNEY</span><h2>Activity history</h2></div></div>{profile?.activities?.length ? <div className="activity-list">{profile.activities.map(activity => <div className="activity-item" key={activity.id}><i/><div><b>{activity.title}</b><span>{activity.description || activity.type.replaceAll('_', ' ')}</span></div><time>{new Date(activity.occurred_at).toLocaleDateString('en-NG')}</time></div>)}</div> : <div className="empty-state">No member activity has been recorded yet.</div>}</article>
      {upcoming ? <article className="portal-card upcoming-card"><div className="event-date"><b>{new Date(upcoming.starts_at).getDate()}</b><span>{new Date(upcoming.starts_at).toLocaleDateString('en', { month: 'short' }).toUpperCase()}</span></div><div><span className="mini-label">UP NEXT</span><h3>{upcoming.title}</h3><p>{upcoming.location}</p></div><Link href="/events"><ArrowUpRight/></Link></article> : <article className="portal-card upcoming-card"><div><span className="mini-label">UPCOMING EVENTS</span><h3>No events published yet</h3><p>New association events will appear here.</p></div></article>}
      <article className="portal-card announcement"><span className="mini-label">ASSOCIATION NEWS</span><h3>Stay informed about ICGS-OSA</h3><p>Read the latest verified announcements and stories from the association.</p><Link href="/news">View news →</Link></article>
      {(community?.whatsapp_url || community?.telegram_url) && <article className="portal-card activity-card"><div className="card-title"><div><span>CLASS OF {community.year}</span><h2>Join your set community</h2></div></div><p className="muted">Connect with classmates through your set&apos;s official groups.</p><div className="community-links">{community.whatsapp_url && <a className="portal-primary" href={community.whatsapp_url} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> Join WhatsApp group</a>}{community.telegram_url && <a className="portal-primary" href={community.telegram_url} target="_blank" rel="noopener noreferrer"><Send size={17}/> Join Telegram group</a>}</div></article>}
    </section>
  </>;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
}
