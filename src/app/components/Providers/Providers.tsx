'use client';

import { MobileProvider } from '../../../../context/MobileContext';
import { ContentProvider } from '../../../../context/ContentContext';
import { ContentProps } from '../../../../context/ContentContext';

export function Providers({
  children,
  contentProps,
}: {
  children: React.ReactNode;
  contentProps: ContentProps;
}) {
  return (
    <MobileProvider>
      <ContentProvider contentProps={contentProps}>{children}</ContentProvider>
    </MobileProvider>
  );
}
