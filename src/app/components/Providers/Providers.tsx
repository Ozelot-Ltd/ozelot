'use client';

import { MobileProvider } from '../../../../context/MobileContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MobileProvider>{children}</MobileProvider>;
}
