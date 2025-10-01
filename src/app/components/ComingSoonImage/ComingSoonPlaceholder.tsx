'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import MouseFollowSVG from './MouseFollowSvg';

gsap.registerPlugin(SplitText, useGSAP);

export default function ComingSoonPlaceholder({}) {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (textRef.current) {
      // Create SplitText INSIDE useGSAP, after the component has mounted
      const split = new SplitText(textRef.current, { type: 'words' });
      const chars = split.words;

      gsap.from(chars, {
        duration: 1,
        y: -100,
        stagger: 0.2,
        yoyo: true,
        ease: 'power1.inOut',
        repeat: 1,
        repeatDelay: 3,
      });

      return () => {
        split.revert();
      };
    }
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'inline-block',
        position: 'relative',
        height: 'calc(10rem + 10vw)',
        width: '100%',
        textTransform: 'uppercase',
        border: '1px solid var(--black)',
        fontSize: '1.5rem',
      }}
    >
      <h1
        style={{ border: 'none', zIndex: 2, fontSize: 'calc(1.5rem + 1.5vw)' }}
        ref={textRef}
      >
        coming soon
      </h1>

      <MouseFollowSVG />
    </div>
  );
}
