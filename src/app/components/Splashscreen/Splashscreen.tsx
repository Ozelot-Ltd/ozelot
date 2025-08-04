'use client';

import React, { useRef, useState } from 'react';

import styles from './Splashscreen.module.css';

import startLoader from './StartLoader';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Splashscreen() {
  const counterRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<(HTMLDivElement | null)[]>([]);
  const splashscreenRef = useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = useState(0);

  const [isAnimationComplete, setIsAnimationComplete] = useState(
    currentValue === 100
  );

  const delay = Math.floor(Math.random() * 200 + 200);

  useGSAP(() => {
    if (currentValue === 0) {
      startLoader(currentValue, setCurrentValue, counterRef, delay);
    }

    if (currentValue === 100) {
      gsap.to(counterRef.current, {
        duration: 0.25,
        delay: 0.5,
        opacity: 0,
      });

      gsap.to(barRef.current, {
        duration: 1.5,
        height: 0,
        delay: 0.5,

        stagger: {
          amount: 0.5,
        },
        ease: 'power2.inOut',
      });

      if (splashscreenRef.current && isAnimationComplete) {
        gsap.to(splashscreenRef.current, {
          y: '-100%',
          onComplete: () => {
            setIsAnimationComplete(false);
          },
        });
      }
    }
  }, [currentValue]);

  return (
    <div className={styles.splashscreen} ref={splashscreenRef}>
      <div className={styles.container}>
        <h1 className={styles.counter} ref={counterRef}>
          {currentValue}
        </h1>
        <div className={styles.overlay}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={styles.bar}
              ref={(el) => {
                barRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
