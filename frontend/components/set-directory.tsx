'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { PageHeading } from '@/components/portal';
import { DetailProfile, MemberDetailModal } from '@/components/member-detail-modal';
import type { Exco } from '@/components/exco-management';
import { api, ApiUser, mediaUrl, Paginated } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';

export function SetDirectory({ adminView = false }: { adminView?: boolean }) {
  const { user, token } = useAuth();
  const [members, setMembers] = useState<ApiUser[]>([]);
  const [excos, setExcos] = useState<Exco[]>([]);
  const [selected, setSelected] = useState<DetailProfile | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const year = user?.graduating_year;

  useEffect(() => {
    if (!token || !year) return;
    const path = user?.role === 'super_admin' ? `/members?year=${year}` : '/members';
    Promise.all([api<Paginated<ApiUser>>(path, {}, token), api<Exco[]>('/my-set-excos', {}, token)]).then(([result, leadership]) => { setMembers(result.data); setExcos(leadership); }).catch(reason => setError(reason.message));
  }, [token, user?.role, year]);

  const filtered = useMemo(() => members.filter(person => `${person.name} ${person.occupation ?? ''} ${person.location ?? ''}`.toLowerCase().includes(query.toLowerCase())), [members, query]);

  return <>
    <PageHeading eyebrow={year ? `${year} graduating set` : 'Graduating set'} title={adminView ? 'My set information' : 'My set directory'} copy={adminView ? 'View your graduating set and member profiles without leaving your administration workspace.' : 'Connect with approved classmates in your graduating set.'}/>
    {!year && <div className="form-message error">No graduating set is assigned to this account.</div>}
    {error && <div className="form-message error">{error}</div>}
    {year && <><div className="directory-toolbar"><div className="portal-search"><Search/><input aria-label="Search classmates" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search your classmates..."/></div><span>{members.length} approved members</span></div><section className="set-directory">{filtered.map(person => { const initials = person.name.split(' ').map(name => name[0]).join('').slice(0, 2); return <article className="portal-card set-person" key={person.id}><span className={`large-avatar ${person.photo_url?'has-photo':''}`}>{person.photo_url?<img src={mediaUrl(person.photo_url)} alt={person.name}/>:initials}</span><h2>{person.name}</h2><p>{person.occupation || 'Alumnus'}</p><span><MapPin/> {person.location || 'Location not shared'}</span><small>{person.company || `Class of ${person.graduating_year}`}</small><button onClick={()=>setSelected(person)}>View profile</button></article>; })}</section>{!error && !filtered.length && <div className="empty-state">No approved classmates found.</div>}</>}
    {excos.length>0 && <section className="portal-card set-exco-strip"><div className="card-title"><div><span>SET LEADERSHIP</span><h2>Class of {year} EXCOs</h2></div></div><div>{excos.map(exco=>{const person=exco.user||exco;return <button key={exco.id} onClick={()=>setSelected(person as ApiUser)}><span className={`portal-avatar ${person.photo_url?'has-photo':''}`}>{person.photo_url?<img src={mediaUrl(person.photo_url)} alt={person.name}/>:person.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</span><span><b>{person.name}</b><small>{exco.role}</small></span></button>})}</div></section>}
    {selected && <MemberDetailModal profile={selected} onClose={()=>setSelected(null)}/>}
  </>;
}
