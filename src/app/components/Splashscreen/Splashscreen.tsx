'use client';

import React, { useRef } from 'react';
import styles from './Splashscreen.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Splashscreen() {
  const upperContainerRef = useRef<HTMLDivElement>(null);
  const lowerContainerRef = useRef<HTMLDivElement>(null);
  const upperCountRef = useRef<HTMLDivElement>(null);
  const lowerCountRef = useRef<HTMLDivElement>(null);
  const splashscreenRef = useRef<HTMLDivElement>(null);

  const upperNumbers = [9, 0, 9, 8, 6, 3];
  const lowerNumbers = [...upperNumbers].reverse();

  useGSAP(() => {
    const windowWidth = window.innerWidth;
    const wrapperWidth = 180;
    const finalPosition = windowWidth - wrapperWidth;
    const stepDistance = finalPosition / 6;

    const tl = gsap.timeline();

    tl.to([upperCountRef.current, lowerCountRef.current], {
      x: -900,
      duration: 0.85,
      delay: 0.5,
      ease: 'power4.inOut',
    });

    for (let i = 1; i <= 6; i++) {
      const xPosition = -900 + i * 180;
      tl.to([upperCountRef.current, lowerCountRef.current], {
        x: xPosition,
        duration: 0.85,
        ease: 'power4.inOut',
        onComplete: () => {
          if (i === 6) {
            gsap.to(splashscreenRef.current, {
              y: '-100vh',
              duration: 0.85,
              ease: 'power4.inOut',
              delay: 1,
              onComplete: () => {
                if (splashscreenRef.current) {
                  splashscreenRef.current.remove();
                }
              },
            });
          }
        },
        onStart: () => {
          gsap.to([upperContainerRef.current, lowerContainerRef.current], {
            x: stepDistance * i,
            duration: 0.85,
            ease: 'power4.inOut',
          });
        },
      });
    }
  }, []);

  return (
    <div className={styles.splashscreen} ref={splashscreenRef}>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h2 className={styles.title}>Ozelot Studios</h2>
          <h2 className={styles.title}>
            Creative Agency & <br />
            Records Label
          </h2>
          <h2 className={styles.title}>Est. Zurich, 2016</h2>
        </div>
        <div style={{ display: 'flex' }}>
          <div className={styles.countWrapper} ref={upperContainerRef}>
            <div className={styles.count} ref={upperCountRef}>
              {upperNumbers.map((number, index) => (
                <div key={index} className={styles.digit}>
                  <h1>{number}</h1>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.countWrapper} ref={lowerContainerRef}>
            <div className={styles.count} ref={lowerCountRef}>
              {lowerNumbers.map((number, index) => (
                <div key={index} className={styles.digit}>
                  <h1>{number}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
