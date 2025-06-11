import React, { useRef } from 'react';
import styles from './FadeIn.module.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  stylesProps?: { readonly [key: string]: string };
  delay?: number;
  multiplier?: number;
};

export default function FadeIn({
  children,
  vars = {},
  stylesProps,
  delay = 0,
  multiplier = 0.1,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Target all direct children
    gsap.fromTo(
      containerRef.current!.children,
      { y: 100 },
      {
        y: 0,
        duration: 1.5,
        delay: delay * multiplier,
        ease: 'power2.out',
        ...vars,
      }
    );
  }, []);
  return (
    <div
      className={`${styles.fadeIn} ${stylesProps && stylesProps.fadeIn}`}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
