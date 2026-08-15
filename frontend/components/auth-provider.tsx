'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiUser } from '@/lib/api';

const TOKEN_KEY = 'icgs_osa_token';
type AuthContextValue = { user: ApiUser | null; token: string | null; loading: boolean; login: (email: string, password: string) => Promise<ApiUser>; logout: () => Promise<void>; refresh: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refresh = useCallback(async () => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) { setLoading(false); return; }
    try {
      const currentUser = await api<ApiUser>('/me', {}, saved);
      // A login may have issued a newer token while this request was running.
      if (localStorage.getItem(TOKEN_KEY) === saved) {
        setToken(saved);
        setUser(currentUser);
      }
    } catch {
      // Never let validation of an old token erase a newer successful login.
      if (localStorage.getItem(TOKEN_KEY) === saved) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      }
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { const timer = window.setTimeout(() => void refresh(), 0); return () => window.clearTimeout(timer); }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await api<{ token: string; user: ApiUser }>('/login', { method: 'POST', body: JSON.stringify({ email: email.trim().toLowerCase(), password: password.trim() }) });
    localStorage.setItem(TOKEN_KEY, result.token);
    setToken(result.token);
    setUser(result.user);
    setLoading(false);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try { if (token) await api('/logout', { method: 'POST' }, token); }
    finally { localStorage.removeItem(TOKEN_KEY); setToken(null); setUser(null); router.replace('/login'); }
  }, [router, token]);

  const value = useMemo(() => ({ user, token, loading, login, logout, refresh }), [user, token, loading, login, logout, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
