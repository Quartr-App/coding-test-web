import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import './globals.css';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />

      <body className='flex flex-col mt-6 mx-6'>
        <header>
          <h2 className={`${inter.className} text-2xl font-bold mb-4`}>
            Quartr
          </h2>
        </header>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
