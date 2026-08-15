'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Images, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import { PageHeading } from '@/components/portal';
import { api, Paginated } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';

type Photo = { id: number; url: string; caption: string | null; original_name: string; sort_order: number };
type Album = { id: number; title: string; starts_at: string; location: string; published: boolean; photos_count: number; photos: Photo[] };

export default function GalleryManagement() {
  const { token } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [eventId, setEventId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<Photo | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const load = useCallback(() => { if (token) api<Paginated<Album>>('/admin/gallery', {}, token).then(result => { setAlbums(result.data); setEventId(current => current ?? result.data[0]?.id ?? null); }).catch(reason => setError(reason.message)); }, [token]);
  useEffect(load, [load]);
  const selected = useMemo(() => albums.find(album => album.id === eventId) ?? null, [albums, eventId]);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!token || !selected) return;
    setError(''); const form = new FormData(event.currentTarget);
    try { await api(`/admin/events/${selected.id}/photos`, { method: 'POST', body: form }, token); setUploading(false); setMessage('Event photos uploaded successfully.'); load(); }
    catch (reason) { setError((reason as Error).message); }
  }
  async function saveCaption(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!token || !editing) return;
    const form = new FormData(event.currentTarget);
    try { await api(`/admin/photos/${editing.id}`, { method: 'PATCH', body: JSON.stringify({ caption: form.get('caption') || null }) }, token); setEditing(null); setMessage('Photo caption updated.'); load(); }
    catch (reason) { setError((reason as Error).message); }
  }
  async function remove(photo: Photo) {
    if (!token || !confirm(`Delete ${photo.original_name}? This cannot be undone.`)) return;
    try { await api(`/admin/photos/${photo.id}`, { method: 'DELETE' }, token); setMessage('Photo deleted.'); load(); }
    catch (reason) { setError((reason as Error).message); }
  }

  return <><PageHeading eyebrow="Media library" title="Event gallery" copy="Upload and organise photographs for published and upcoming association events." action={selected ? <button className="portal-primary" onClick={() => setUploading(true)}><Upload/>Upload photos</button> : undefined}/>{message && <div className="form-message success">{message}</div>}{error && <div className="form-message error">{error}</div>}<section className="portal-card management-card"><div className="management-tools"><label className="gallery-event-select">Event<select value={eventId ?? ''} onChange={event => setEventId(Number(event.target.value))}>{albums.map(album => <option key={album.id} value={album.id}>{album.title} ({album.photos.length})</option>)}</select></label>{selected && <span className="management-count">{selected.photos.length} photos · {selected.published ? 'Published event' : 'Draft event'}</span>}</div>{selected ? <><div className="admin-gallery-head"><div><span>{new Date(selected.starts_at).toLocaleDateString()} · {selected.location}</span><h2>{selected.title}</h2></div></div><div className="admin-gallery-grid">{selected.photos.map(photo => <article key={photo.id}><img src={photo.url} alt={photo.caption || photo.original_name}/><div><span><b>{photo.caption || 'No caption'}</b><small>{photo.original_name}</small></span><button onClick={() => setEditing(photo)} title="Edit caption"><Pencil/></button><button onClick={() => remove(photo)} title="Delete photo"><Trash2/></button></div></article>)}</div>{!selected.photos.length && <div className="empty-state"><Images/> No photos have been uploaded for this event.</div>}</> : <div className="empty-state"><Images/> Create an event before adding gallery photographs.</div>}</section>{uploading && selected && <div className="portal-modal-backdrop"><div className="portal-modal"><div className="modal-head"><div><span>EVENT PHOTOGRAPHS</span><h2>Upload to {selected.title}</h2></div><button onClick={() => setUploading(false)}><X/></button></div><form onSubmit={upload}><label>Choose photographs<input name="photos[]" type="file" accept="image/jpeg,image/png,image/webp" multiple required/><small>Up to 30 JPG, PNG or WebP files, maximum 10 MB each.</small></label><label>Shared caption<textarea name="caption" rows={3} placeholder="Optional caption applied to these photographs"/></label><div className="modal-actions"><button type="button" onClick={() => setUploading(false)}>Cancel</button><button className="portal-primary"><Plus/>Upload photos</button></div></form></div></div>}{editing && <div className="portal-modal-backdrop"><div className="portal-modal"><div className="modal-head"><div><span>PHOTO DETAILS</span><h2>Edit caption</h2></div><button onClick={() => setEditing(null)}><X/></button></div><form onSubmit={saveCaption}><label>Caption<textarea name="caption" rows={3} defaultValue={editing.caption ?? ''}/></label><div className="modal-actions"><button type="button" onClick={() => setEditing(null)}>Cancel</button><button className="portal-primary">Save caption</button></div></form></div></div>}</>;
}
