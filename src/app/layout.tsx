import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Host_Grotesk } from 'next/font/google';

import './globals.css';
import TestComponent from './components/TestComponent';

const host = Host_Grotesk({
  weight: 'variable',
  style: 'normal',
  preload: true,
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={host.className}>
        <TestComponent />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
