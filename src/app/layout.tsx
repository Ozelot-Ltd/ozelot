import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Host_Grotesk } from 'next/font/google';
import { createClient } from '@/prismicio';

import './globals.css';
import MainComponent from './components/MainComponent';
import { Providers } from './components/Providers/Providers';
import { BackgroundComponent } from './components/BackgroundComponent/BackgroundComponent';

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
  try {
    const client = createClient();
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
      soundDesignIcon,
      graphicDesignIcon,
      aIIcon,
      socialBar,
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
      client.getSingle('sound_design_icon'),
      client.getSingle('graphic_icon'),
      client.getSingle('ai_icon'),
      client.getSingle('social_bar'),
    ]);

    // Check if all data has been successfully fetched
    if (
      !settings ||
      !studio ||
      !contact ||
      !projectArray ||
      !recordArray ||
      !serviceArray ||
      !threeDIcon ||
      !artDirectionIcon ||
      !webIcon ||
      !generalIcon ||
      !soundDesignIcon ||
      !graphicDesignIcon ||
      !aIIcon ||
      !socialBar
    ) {
      throw new Error('Failed to load required data');
    }

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
      soundDesignIcon,
      graphicDesignIcon,
      aIIcon,
      socialBar,
    };

    const leftField = settings.data.navigation_items_left;
    const rightField = settings.data.navigation_items_right;

    // Check that navigation items are available
    if (!leftField || !rightField) {
      throw new Error('Navigation settings not available');
    }

    const settingsProps = {
      left: leftField,
      right: rightField,
    };

    return (
      <html lang="en">
        <body className={host.className}>
          <BackgroundComponent />
          <Providers contentProps={contentProps}>
            <MainComponent {...settingsProps} />
            {children}
          </Providers>
        </body>
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    );
  } catch (error) {
    // You could return a loading or error state here
    console.error('Failed to load application data:', error);

    return (
      <html lang="en">
        <body className={host.className}>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Loading...</h1>
            <p>Please wait while we prepare the content.</p>
          </div>
        </body>
      </html>
    );
  }
}
