'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './Splashscreen.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { isSplashscreenFinishedStore } from '@/app/stores/SplashscreenIsFinished';

gsap.registerPlugin(useGSAP);

export default function Splashscreen() {
  const upperContainerRef = useRef<HTMLDivElement>(null);
  const lowerContainerRef = useRef<HTMLDivElement>(null);
  const upperCountRef = useRef<HTMLDivElement>(null);
  const lowerCountRef = useRef<HTMLDivElement>(null);
  const splashscreenRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [randomArray, setRandomArray] = useState<number[]>([]);

  const { isSplashscreenFinished, setIsSplashscreenFinished } =
    isSplashscreenFinishedStore();

  useEffect(() => {
    const randomArrayGenerator = () => {
      const arrays = [
        [9, 8, 6, 4, 1, 0],
        [9, 7, 5, 3, 2, 0],
        [8, 9, 4, 2, 1, 0],
        [9, 8, 5, 3, 1, 0],
        [9, 8, 6, 4, 2, 0],
        [8, 9, 7, 5, 1, 0],
      ];

      setRandomArray(arrays[Math.floor(Math.random() * 6)]);
    };

    randomArrayGenerator();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const upperNumbers = randomArray;
  const lowerNumbers = [...upperNumbers].reverse();
  lowerNumbers[0] = 9;

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
              onComplete: () => {
                if (splashscreenRef.current) {
                  setIsSplashscreenFinished(!isSplashscreenFinished);
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
  }, [isMobile]);

  return (
    <div className={styles.splashscreen} ref={splashscreenRef}>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h2 className={styles.title}>Ozelot Studios</h2>
          <h2 className={styles.title}>
            Creative Agency & <br />
            Record Label
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
