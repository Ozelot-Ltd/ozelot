'use client';

import { useRef, useEffect } from 'react';
import styles from './Splashscreen.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { isSplashscreenFinishedStore } from '@/app/stores/SplashscreenIsFinished';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

export default function Splashscreen() {
  const splashscreenRef = useRef<HTMLDivElement>(null);
  const animationsquareRefs = useRef<HTMLDivElement[] | null>([]);
  const textRef = useRef<HTMLImageElement>(null);
  const { setIsSplashscreenFinished, isSceneLoaded } =
    isSplashscreenFinishedStore();
  const part2Ref = useRef<gsap.core.Timeline | null>(null);

  const count = 6;
  const sliceWidth = 100 / count;

  // Part 1: squares animate in, then trigger scene loading
  useGSAP(
    () => {
      if (!animationsquareRefs.current) return;

      const tl = gsap.timeline();

      animationsquareRefs.current.forEach((el, index) => {
        if (!el) return;
        tl.to(
          el,
          {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.8,
            borderWidth: '0.5px',
            rotateX: 0,
          },
          index * 0.08,
        );
      });

      tl.call(() => {
        setIsSplashscreenFinished(true);
      });

      const part2 = gsap.timeline({ paused: true });
      part2
        .to(splashscreenRef.current, {
          backgroundColor: 'transparent',
          duration: 0,
        })
        .to(splashscreenRef.current, {
          y: '-100%',
          ease: 'power2.out',
          duration: 0.6,
          delay: 0.2,
        });

      part2Ref.current = part2;
    },
    { scope: splashscreenRef },
  );

  // Play part 2 when scene is loaded
  useEffect(() => {
    if (isSceneLoaded && part2Ref.current) {
      part2Ref.current.play();
    }
  }, [isSceneLoaded]);

  return (
    <div className={styles.splashscreen} ref={splashscreenRef}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className={styles.animationsquare}
          key={index}
          style={{ left: `${index * sliceWidth}%`, width: `${sliceWidth}%` }}
          ref={(el) => {
            if (animationsquareRefs.current && el) {
              animationsquareRefs.current[index] = el;
            }
          }}
        ></div>
      ))}
    </div>
  );
}
