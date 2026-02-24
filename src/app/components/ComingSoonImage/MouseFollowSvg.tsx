'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Image from 'next/image';

import { useMobile } from '../../../../context/MobileContext';

gsap.registerPlugin(useGSAP);

export default function MouseFollowSVG() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const url = 'https://res.cloudinary.com/ddkwj78mq/image/upload/v1759149385/';
  const { isMobile } = useMobile();

  useGSAP(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      // Get mouse position relative to the container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Animate image to follow mouse
      gsap.to(image, {
        x: x - image.getBoundingClientRect().width / 10,
        y: y - image.getBoundingClientRect().height / 10,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  });

  useEffect(() => {
    const number = Math.random();

    if (number < 0.58) {
      setImage('Untitled-1_ut48io.png');
    } else {
      setImage('bing_thipgu.png');
    }
  }, [image]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        top: '0',
        left: '0',
        zIndex: '1'
      }}
    >
      <Image
        ref={imageRef}
        src={`${url}${image}`}
        alt="Decorative"
        width={50}
        height={50}
        style={{ height: `${!isMobile ? 6 : 4}rem`, width: 'auto' }}
      />
    </div>
  );
}
