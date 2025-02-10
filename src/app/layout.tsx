import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Host_Grotesk } from 'next/font/google';

const host = Host_Grotesk({
  weight: 'variable',
  style: 'normal',
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={host.className}>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
