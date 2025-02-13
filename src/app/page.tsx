import { type Metadata } from 'next';

import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import TestComponent from './components/TestComponent';

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return (
    <div>
      <TestComponent />
      <SliceZone slices={home.data.slices} components={components} />
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
