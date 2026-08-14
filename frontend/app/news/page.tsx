'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Link as LinkIcon, Newspaper, UserRound, X } from 'lucide-react';
import { PageHero } from '@/components/site';
import { api, Paginated } from '@/lib/api';
import type { Article } from '@/app/admin/news/page';

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Paginated<Article>>('/news').then(result => setArticles(result.data)).catch(reason => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!articles.length || selected) return;
    const slug = new URLSearchParams(location.search).get('article');
    if (!slug) return;
    const local = articles.find(article => article.slug === slug);
    if (local) setSelected(local);
    else api<Article>(`/news/${slug}`).then(setSelected).catch(() => history.replaceState(null, '', '/news'));
  }, [articles, selected]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  const featured = articles.find(article => article.featured) ?? articles[0];
  const rest = articles.filter(article => article.id !== featured?.id);
  function open(article: Article) { setSelected(article); history.replaceState(null, '', `/news?article=${article.slug}`); }
  function close() { setSelected(null); history.replaceState(null, '', '/news'); }

  return <>
    <PageHero eyebrow="Stories from our community" title="News & announcements." copy="Stay informed about our association, alma mater and the remarkable people who share our heritage." />
    <section className="news-section"><div className="shell">
      {loading && <div className="empty-state">Loading articles...</div>}
      {error && <div className="form-message error">{error}</div>}
      {featured && <article className="news-feature">
        <div className="news-feature-image">{featured.image_url ? <img src={featured.image_url} alt={featured.title} /> : <Newspaper />}</div>
        <div><span className="role">{featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt || featured.body.slice(0, 220)}</p><small><CalendarDays /> {formatDate(featured.published_at)} · {featured.author?.name || 'ICGS-OSA'}</small><button onClick={() => open(featured)}>Read full story <ArrowRight /></button></div>
      </article>}
      <div className="modern-news-grid">{rest.map(article => <article key={article.id}>
        <div className="news-card-image">{article.image_url ? <img src={article.image_url} alt={article.title} /> : <Newspaper />}</div>
        <section><span className="role">{article.category}</span><h3>{article.title}</h3><p>{article.excerpt || article.body.slice(0, 140)}</p><small>{formatDate(article.published_at)}</small><button onClick={() => open(article)}>Read story <ArrowRight /></button></section>
      </article>)}</div>
      {!loading && !error && !articles.length && <div className="gallery-empty"><Newspaper /><span className="eyebrow">Editorial desk</span><h2>Stories are on the way.</h2><p>Association updates and alumni stories will appear here after publication.</p></div>}
    </div></section>
    {selected && <div className="news-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <article className="news-reader" role="dialog" aria-modal="true" aria-labelledby="article-title">
        <button className="news-reader-close" onClick={close} aria-label="Close article"><X /></button>
        {selected.image_url && <div className="news-reader-image"><img src={selected.image_url} alt={selected.title} /></div>}
        <div className="news-reader-content"><span className="role">{selected.category}</span><h1 id="article-title">{selected.title}</h1><div className="news-reader-meta"><span><CalendarDays />{formatDate(selected.published_at)}</span><span><UserRound />{selected.author?.name || 'ICGS-OSA Editorial Team'}</span></div>{selected.excerpt && <p className="news-reader-lead">{selected.excerpt}</p>}<div className="news-reader-body">{selected.body.split(/\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><button className="copy-link" onClick={() => navigator.clipboard.writeText(`${location.origin}/news?article=${selected.slug}`)}><LinkIcon />Copy article link</button></div>
      </article>
    </div>}
  </>;
}

function formatDate(value: string | null) { return value ? new Date(value).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Draft'; }
