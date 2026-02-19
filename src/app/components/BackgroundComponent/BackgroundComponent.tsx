'use client';

import dynamic from 'next/dynamic';
import { isSplashscreenFinishedStore } from '@/app/stores/SplashscreenIsFinished';

const Experience = dynamic(
  () => import('./Experience/Experience').then((mod) => mod.Experience),
  { ssr: false },
);

export const BackgroundComponent = () => {
  const { isSplashscreenFinished } = isSplashscreenFinishedStore();

  if (!isSplashscreenFinished) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'auto',
      }}
    >
      <Experience />
    </div>
  );
};
