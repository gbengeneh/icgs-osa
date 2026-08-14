import type { Metadata } from 'next';
import './globals.css';
import { Footer, Header } from '@/components/site';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = { title: 'ICGS-OSA | Together Again. Forward Always.', description: 'The official digital home of Igbotako Community Grammar School Old Students Association.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><AuthProvider><Header /><main>{children}</main><Footer /></AuthProvider></body></html>;
}
