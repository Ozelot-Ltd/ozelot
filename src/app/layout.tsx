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

  const [
    studio,
    contact,
    projectArray,
    recordArray,
    serviceArray,
    threeDIcon,
    artDirectionIcon,
    webIcon,
    generalIcon,
  ] = await Promise.all([
    client.getSingle('studio'),
    client.getSingle('contact'),
    client.getByType('project'),
    client.getByType('record'),
    client.getByType('service'),
    client.getSingle('threed_icon'),
    client.getSingle('art_direction_icon'),
    client.getSingle('web_icon'),
    client.getSingle('general_icon'),
  ]);

  const contentProps = {
    studio,
    contact,
    projectArray: projectArray.results,
    recordArray: recordArray.results,
    serviceArray: serviceArray.results,
    threeDIcon,
    artDirectionIcon,
    webIcon,
    generalIcon,
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
