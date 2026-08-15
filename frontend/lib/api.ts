// Browser requests stay on the Next.js origin and are proxied to Laravel.
// This avoids localhost resolving to IPv6 while PHP listens on IPv4.
const API_URL = '/backend-api';

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: 'member' | 'coordinator' | 'admin' | 'super_admin';
  status: 'pending' | 'verified' | 'active' | 'rejected' | 'suspended';
  graduating_year: number | null;
  phone?: string | null;
  occupation?: string | null;
  company?: string | null;
  location?: string | null;
  bio?: string | null;
  photo_url?: string | null;
};

export type Paginated<T> = { data: T[]; current_page: number; last_page: number; per_page: number; total: number };

export class ApiError extends Error {
  constructor(message: string, public status: number, public errors?: Record<string, string[]>) { super(message); }
}

export async function api<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  const isFormData = options.body instanceof FormData;
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { Accept: 'application/json', ...(!isFormData ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    });
  } catch {
    throw new ApiError('The server is currently unavailable. Please try again shortly.', 0);
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(payload.message ?? 'The request could not be completed.', response.status, payload.errors);
  return payload as T;
}
