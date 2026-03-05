import { useRef, useEffect } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '@/context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import { PrismicRichText } from '@prismicio/react';
import useSmoothScroll from '@/hooks/useSmoothScroll';

const ServiceComponent = () => {
  const { serviceArray, servicesMain } = useContents();

  const containerRef = useRef<HTMLDivElement>(null);

  useSmoothScroll(containerRef, { lerp: 0.01, wheelMultiplier: 2 });

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        '--service-container-width',
        `${containerWidth}px`
      );
    }
  }, [containerRef]);

  const sortedArray = serviceArray.sort((a, b) => {
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
            <div className={styles.description}>
              <p style={{ width: '60%' }}>
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
