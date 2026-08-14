# ICGS-OSA Alumni Platform

Monorepo for the Igbotako Community Grammar School Old Students Association website.

## Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Backend: Laravel 12 REST API, Sanctum, MySQL

## Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Start the backend

Requirements: PHP 8.2+, Composer, MySQL.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API runs at http://localhost:8000. The frontend sends browser requests to its
same-origin `/backend-api` route and Next.js proxies them to Laravel. For local
development, copy `frontend/.env.example` to `frontend/.env.local`.

When the backend is deployed, add this environment variable in the Vercel
project settings and redeploy the frontend:

```env
BACKEND_ORIGIN=https://api.your-domain.com
```

Use the backend origin only (no trailing `/api`); the proxy adds `/api`
automatically. `NEXT_PUBLIC_API_URL` should normally remain unset. This avoids
browser CORS issues and keeps the VPS address out of the client bundle.

## Current milestone

The public experience and responsive authentication screens are complete. The Laravel folder establishes the API contract, models, migrations, controllers and seed data. Replace the clearly marked school-history and EXCO placeholders when verified content and portraits are available.

## Open in VS Code

Extract the ZIP, open PowerShell in the extracted folder, then run `code .`.
