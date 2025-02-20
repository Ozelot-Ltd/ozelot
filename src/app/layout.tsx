import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Host_Grotesk } from 'next/font/google';
import { createClient } from '@/prismicio';

import './globals.css';
import MainComponent from './components/MainComponent';
import { Providers } from './components/Providers/Providers';

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

  const [studio, projects, records, contact, projectArray, recordArray] =
    await Promise.all([
      client.getSingle('studio'),
      client.getSingle('projects'),
      client.getSingle('records'),
      client.getSingle('contact'),
      client.getByType('project'),
      client.getByType('record'),
    ]);

  const contentProps = {
    studio,
    projects,
    records,
    contact,
    projectArray: projectArray.results,
    recordArray: recordArray.results,
  };

  const leftField = settings.data.navigation_items_left;
  const rightField = settings.data.navigation_items_right;

  const settingsProps = {
    left: leftField,
    right: rightField,
  };

  return (
    <html lang="en">
      <body className={host.className}>
        <Providers contentProps={contentProps}>
          <MainComponent {...settingsProps} />
          {children}
        </Providers>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
