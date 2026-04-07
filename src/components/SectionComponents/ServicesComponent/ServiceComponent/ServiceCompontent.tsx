'use client';

import { useRef, useLayoutEffect } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '@/context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/components/FadeIn/FadeIn';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/src/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

const ServiceComponent = () => {
  const { serviceArray, servicesMain } = useContents();

  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      document.documentElement.style.setProperty(
        '--service-container-width',
        `${container.offsetWidth}px`
      );
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useGSAP(() => {
    if (!paragraphRef.current) return;

    const split = new SplitText(paragraphRef.current, {
      type: 'lines,words',
      linesClass: 'split-line'
    });

    // Wrap each line in overflow:hidden for the mask effect
    (split.lines as HTMLElement[]).forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode!.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(split.words, {
      duration: 1,
      y: 100,
      stagger: 0.02
    });
  });

  const sortedArray = [...serviceArray].sort((a, b) => {
    const numA = a.data.index ?? 0;
    const numB = b.data.index ?? 0;
    return numA - numB;
  });

  const components: JSXMapSerializer = {
    heading2: ({ children }) => <h1>{children}</h1>
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.upperContainer}>
        <div>
          <FadeIn multiplier={0.1} delay={0} yDown={500} duration={1}>
            <PrismicRichText
              field={servicesMain.data.service_title}
              components={components}
            />
          </FadeIn>
        </div>
        <div>
          <div className={`${styles.description}`}>
            <p ref={paragraphRef}>
              We decode subcultures and translate them into brand language – our
              work resonates because they're rooted in how people actually
              think, move, and communicate.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.scrollContainer}>
        {sortedArray.map((service, index) => (
          <div key={`${service.id}-${index}`}>
            <Service service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComponent;
