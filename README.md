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

The API runs at http://localhost:8000. Set `NEXT_PUBLIC_API_URL=http://localhost:8000/api` in `frontend/.env.local`.

## Current milestone

The public experience and responsive authentication screens are complete. The Laravel folder establishes the API contract, models, migrations, controllers and seed data. Replace the clearly marked school-history and EXCO placeholders when verified content and portraits are available.

## Open in VS Code

Extract the ZIP, open PowerShell in the extracted folder, then run `code .`.
