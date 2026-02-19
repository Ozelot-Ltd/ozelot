'use client';

import { useRef, useState, useEffect } from 'react';
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
  const { setIsSplashscreenFinished } = isSplashscreenFinishedStore();

  const count = 6;
  const sliceWidth = 100 / count;

  useGSAP(
    () => {
      if (!animationsquareRefs.current || !textRef.current) return;

      const tl = gsap.timeline();

      animationsquareRefs.current.forEach((el, index) => {
        if (!el) return;
        tl.to(
          el,
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          index * 0.08,
        ).to(splashscreenRef.current, {
          backgroundColor: 'transparent',
          duration: 0,
          delay: 0.15,
        });
      });

      tl.to(textRef.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power2.out',
      })
        .call(() => {
          setIsSplashscreenFinished(true);
        })

        .to(textRef.current, {
          y: '-100%',
          duration: 0.3,
          ease: 'power2.in',
          delay: 0.6,
        })
        .to(splashscreenRef.current, {
          y: '-100%',
        });
    },
    { scope: splashscreenRef },
  );

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

      <div className={styles.text}>
        <Image
          alt="logo"
          ref={textRef}
          src={'/svg/ozelot_logo.svg'}
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
