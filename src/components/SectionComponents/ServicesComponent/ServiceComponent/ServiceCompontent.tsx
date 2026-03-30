'use client';

import { useRef, useEffect } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '@/context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/components/FadeIn/FadeIn';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

const ServiceComponent = () => {
  const { serviceArray, servicesMain } = useContents();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          <FadeIn multiplier={0.1} delay={0} yDown={2000} duration={2}>
            <div className={`${styles.description}`}>
              <p>
                We decode subcultures and translate them into brand language –
                our work resonates because they're rooted in how people actually
                think, move, and communicate.{' '}
              </p>
            </div>
          </FadeIn>
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
