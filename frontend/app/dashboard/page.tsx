'use client';
import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, CalendarCheck2, CheckCircle2, GraduationCap, MapPin, ReceiptText, UserRoundCheck } from 'lucide-react';
import { PageHeading, StatCard } from '@/components/portal';
import { activities, member } from '@/lib/portal-data';

export default function MemberDashboard() {
  return <>
    <PageHeading eyebrow="Monday, 10 August 2026" title={`Welcome back, ${member.name.split(' ')[0]}.`} copy="Here is what is happening across your alumni community." action={<Link className="portal-primary" href="/events">Explore events <ArrowUpRight size={17}/></Link>}/>
    <section className="portal-stats">
      <StatCard label="Profile strength" value={`${member.completion}%`} note="Add employment history" icon={UserRoundCheck}/>
      <StatCard label="Events attended" value="07" note="2 upcoming registrations" icon={CalendarCheck2} tone="gold"/>
      <StatCard label="Total contributions" value="₦185k" note="Across 4 projects" icon={ReceiptText} tone="green"/>
    </section>
    <section className="member-dashboard-grid">
      <article className="portal-card profile-summary">
        <div className="profile-banner"><span className="large-avatar">{member.initials}</span><span className="verified"><CheckCircle2 size={14}/> Verified alumnus</span></div>
        <div className="profile-copy"><small>MEMBER ID · {member.memberId}</small><h2>{member.name}</h2><span className="set-pill"><GraduationCap size={16}/>{member.set}</span><div className="profile-detail"><BriefcaseBusiness/><span><small>Current position</small><b>{member.position}</b><p>{member.company}</p></span></div><div className="profile-detail"><MapPin/><span><small>Current location</small><b>{member.location}</b></span></div><div className="profile-progress"><span><b>Profile completion</b><small>{member.completion}%</small></span><i><em style={{width: `${member.completion}%`}}/></i></div><Link href="/dashboard/profile">Complete your profile <ArrowUpRight size={16}/></Link></div>
      </article>
      <article className="portal-card activity-card"><div className="card-title"><div><span>YOUR JOURNEY</span><h2>Activity history</h2></div><button>View all</button></div><div className="activity-list">{activities.map(item => <div className="activity-item" key={item.title}><i className={item.tone}/><div><b>{item.title}</b><span>{item.meta}</span></div><time>{item.date}</time></div>)}</div></article>
      <article className="portal-card upcoming-card"><div className="event-date"><b>24</b><span>OCT</span></div><div><span className="mini-label">UP NEXT</span><h3>2026 Alumni Homecoming</h3><p>ICGS School Grounds · Igbotako</p></div><Link href="/events"><ArrowUpRight/></Link></article>
      <article className="portal-card announcement"><span className="mini-label">FROM THE SECRETARIAT</span><h3>Call for nominations: Alumni Achievement Awards</h3><p>Celebrate an alumnus creating meaningful impact in their profession or community.</p><Link href="/news">Read announcement →</Link></article>
    </section>
  </>;
}
