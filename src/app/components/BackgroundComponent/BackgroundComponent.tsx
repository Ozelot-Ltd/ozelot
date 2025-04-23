'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Experience } from './Experience/Experience';

import { Perf } from 'r3f-perf';
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  {
    ssr: false,
  }
);

export const BackgroundComponent = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          style={{
            width: '100%',
            height: '100%',
          }}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
        >
          <Perf style={{ right: '50%' }} />
          <Experience />
        </Canvas>
      </Suspense>
    </div>
  );
};
