import { type Metadata } from 'next';

import { createClient } from '@/prismicio';
import TestComponent from './components/TestComponent';

export default async function Home() {
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
    <div>
      <TestComponent {...settingsProps} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }],
    },
  };
}
