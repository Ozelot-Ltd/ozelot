'use client';

import { useRef, useEffect } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '@/context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import { PrismicRichText } from '@prismicio/react';

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

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.upperContainer}>
        <div>
          <FadeIn multiplier={0.1} delay={0} yDown={500} duration={1}>
            <PrismicRichText field={servicesMain.data.service_title} />
          </FadeIn>
        </div>
        <div>
          <FadeIn multiplier={0.1} delay={0} yDown={2000} duration={2}>
            <div className={`${styles.description}`}>
              <p>
                We design brands and build digital products that are culturally
                relevant and built to last. Ozelot Studios combines visual
                excellence with product thinking – grounded in a deep
                understanding of culture, audiences, and context.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className={styles.scrollContainer}>
        {/* {sortedArray.map((service, index) => (
          <div key={`${service.id}-${index}`}>
            <Service service={service} />
          </div>
        ))} */}

        <Service service={sortedArray[0]} />
      </div>
    </div>
  );
};

export default ServiceComponent;
