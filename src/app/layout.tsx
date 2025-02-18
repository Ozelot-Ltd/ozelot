import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Host_Grotesk } from 'next/font/google';
import { createClient } from '@/prismicio';

import './globals.css';
import MainComponent from './components/MainComponent';

const host = Host_Grotesk({
  weight: 'variable',
  style: 'normal',
  preload: true,
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  // const home = await client.getByUID('page', 'home');

  const settings = await client.getSingle('settings');
  console.log(settings.data);

  const leftField = settings.data.navigation_items_left;
  const rightField = settings.data.navigation_items_right;

  const settingsProps = {
    left: leftField,
    right: rightField,
  };

  return (
    <html lang="en">
      <body className={host.className}>
        <MainComponent {...settingsProps} />
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
