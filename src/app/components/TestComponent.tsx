'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TestComponent.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function TestComponent() {
  const [isClicked, setIsClicked] = useState('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(() => {
    if (!isClicked) return;

    const targetRef =
      isClicked === 'about'
        ? aboutRef.current
        : isClicked === 'projects'
          ? projectsRef.current
          : null;

    if (targetRef) {
      gsap.to(targetRef, {
        width: '100%',
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          // Only navigate after animation completes
          if (isClicked) {
            router.push(targetRef.id);
          }
        },
      });
    }
  }, [isClicked]);

  return (
    <div>
      <div className={styles.div} id="about" ref={aboutRef}>
        <a onClick={() => setIsClicked('about')}>
          <p>ABOUT</p>
          <p>02</p>
        </a>
      </div>
      <div className={styles.div} id="projects" ref={projectsRef}>
        <a onClick={() => setIsClicked('projects')}>
          <p>PROJECTS</p>
          <p>01</p>
        </a>
      </div>
    </div>
  );
}
