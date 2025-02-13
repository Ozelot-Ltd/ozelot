import { type Metadata } from 'next';

import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return (
    <div>
      <div className="test">
        <a>
          <p>ABOUT</p>
          <p>02</p>
        </a>
      </div>
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

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }],
    },
  };
}
