'use client';

import { MobileProvider } from '../../../../context/MobileContext';
import { ContentProvider } from '../../../../context/ContentContext';

export function Providers({
  children,
  contentProps,
}: {
  children: React.ReactNode;
  contentProps: object[];
}) {
  return (
    <MobileProvider>
      <ContentProvider contentProps={contentProps}>{children}</ContentProvider>
    </MobileProvider>
  );
}
