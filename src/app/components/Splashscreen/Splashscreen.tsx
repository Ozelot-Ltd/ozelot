'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './Splashscreen.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { isSplashscreenFinishedStore } from '@/app/stores/SplashscreenIsFinished';

import { arrays } from './Arrays';

gsap.registerPlugin(useGSAP);

export default function Splashscreen() {
  const upperContainerRef = useRef<HTMLDivElement>(null);
  const lowerContainerRef = useRef<HTMLDivElement>(null);
  const upperCountRef = useRef<HTMLDivElement>(null);
  const lowerCountRef = useRef<HTMLDivElement>(null);
  const splashscreenRef = useRef<HTMLDivElement>(null);
  const mobileCountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [randomArray, setRandomArray] = useState<number[]>([]);
  const [mobileCount, setMobileCount] = useState(0);

  const { isSplashscreenFinished, setIsSplashscreenFinished } =
    isSplashscreenFinishedStore();

  useEffect(() => {
    const randomArrayGenerator = () => {
      setRandomArray(arrays[Math.floor(Math.random() * arrays.length)]);
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
  if (lowerNumbers.length > 0) {
    lowerNumbers[0] = 9;
  }

  useGSAP(() => {
    if (isMobile) {
      // Mobile animation: count from 0 to 100
      const tl = gsap.timeline();

      tl.to(
        {},
        {
          duration: 3, // Total duration for counting
          delay: 0.5,
          ease: 'power4.out',
          onUpdate: function () {
            const progress = this.progress();
            const currentCount = Math.floor(progress * 100);
            setMobileCount(currentCount);
          },
          onComplete: () => {
            setMobileCount(100);
            // Exit animation
            if (splashscreenRef.current) {
              gsap.to(splashscreenRef.current, {
                y: '-100vh',
                duration: 0.85,
                delay: 0.3,
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
        }
      );
    } else {
      // Desktop animation: original logic
      // Check if refs exist before using them
      if (
        !upperCountRef.current ||
        !lowerCountRef.current ||
        !upperContainerRef.current ||
        !lowerContainerRef.current
      ) {
        return;
      }

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
              if (splashscreenRef.current) {
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
            }
          },
          onStart: () => {
            if (upperContainerRef.current && lowerContainerRef.current) {
              gsap.to([upperContainerRef.current, lowerContainerRef.current], {
                x: stepDistance * i,
                duration: 0.85,
                ease: 'power4.inOut',
              });
            }
          },
        });
      }
    }
  }, [isMobile, randomArray]); // Added randomArray as dependency

  return (
    <div className={styles.splashscreen} ref={splashscreenRef}>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h2 className={styles.title}>Ozelot Studios</h2>
          <h2 className={styles.title}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}> Creative Agency & </h2>{' '}
              <h2 className={styles.title}> Record Label</h2>
            </div>
          </h2>
          <h2 className={styles.title}>Est. Zurich, 2016</h2>
        </div>

        {isMobile ? (
          // Mobile counter
          <div className={styles.mobileCountWrapper}>
            <div className={styles.mobileCount} ref={mobileCountRef}>
              <h1>{mobileCount}</h1>
            </div>
          </div>
        ) : (
          // Desktop animation
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
        )}
      </div>
    </div>
  );
}
