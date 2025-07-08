import React, { useRef } from 'react';
import styles from './FadeIn.module.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  stylesProps?: { readonly [key: string]: string };
  delay?: number;
  multiplier?: number | undefined;
  yDown?: number;
  inlineStyle?: React.CSSProperties;
  duration?: number;
  ease?: string;
  onClick?: () => void;
};

export default function FadeIn({
  children,
  vars = {},
  stylesProps,
  delay = 0,
  multiplier,
  yDown = 100,
  inlineStyle = {},
  duration = 0.75,
  ease = 'power2.out',
  onClick,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tween = gsap.fromTo(
        containerRef.current!.children,
        { y: yDown },
        {
          y: 0,
          duration: duration,
          delay: multiplier ? delay * multiplier : delay,
          ease: ease,
          ...vars,
        }
      );

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef }
  );
  return (
    <div
      className={`${styles.fadeIn} ${stylesProps && stylesProps.fadeIn}`}
      ref={containerRef}
      style={inlineStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
