'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { PageHeading } from '@/components/portal';
import { api } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';

type SetCommunity = { id: number; year: number; description: string | null; whatsapp_url: string | null; telegram_url: string | null };

export default function SetCommunityPage() {
  const { token } = useAuth();
  const [set, setSet] = useState<SetCommunity | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const load = useCallback(() => { if (token) api<SetCommunity>('/my-set', {}, token).then(setSet).catch(reason => setError(reason.message)); }, [token]);
  useEffect(load, [load]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    setMessage(''); setError('');
    const form = new FormData(event.currentTarget);
    try {
      await api('/set-management/community-links', { method: 'PATCH', body: JSON.stringify({ whatsapp_url: form.get('whatsapp_url') || null, telegram_url: form.get('telegram_url') || null }) }, token);
      setMessage('Community links updated successfully.'); load();
    } catch (reason) { setError((reason as Error).message); }
  }

  return <><PageHeading eyebrow={set ? `Class of ${set.year}` : 'Set administration'} title="Community group links" copy="Add the official WhatsApp and Telegram groups that members of your set can join from their dashboard."/>{message && <div className="form-message success">{message}</div>}{error && <div className="form-message error">{error}</div>}{set && <form className="portal-card settings-form" onSubmit={save}><h2>Official set groups</h2><label><MessageCircle size={18}/> WhatsApp invitation link<input name="whatsapp_url" type="url" defaultValue={set.whatsapp_url ?? ''} placeholder="https://chat.whatsapp.com/..."/></label><label><Send size={18}/> Telegram group link<input name="telegram_url" type="url" defaultValue={set.telegram_url ?? ''} placeholder="https://t.me/..."/></label><p className="muted">Only links for the official groups of the Class of {set.year} should be added here.</p><button className="portal-primary">Save group links</button></form>}</>;
}
