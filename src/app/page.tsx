import { type Metadata } from 'next';

import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  // <SliceZone> renders the page's slices.

  return (
    <div>
      <div className="test">
        <a>
          <p>PROJECTS</p>
          <p>01</p>
        </a>
      </div>
      <SliceZone slices={home.data.slices} components={components} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  console.log(home.data.meta_title);

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }],
    },
  };
}
