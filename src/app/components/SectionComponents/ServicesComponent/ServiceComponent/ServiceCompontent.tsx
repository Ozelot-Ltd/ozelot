import React, { useState, useRef, useEffect } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import ServiceMarquee from './components/ServiceMarquee';

const ServiceComponent = () => {
  const { serviceArray, servicesMain } = useContents();
  const [activeService, setActiveService] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      console.log('container width set to:', containerWidth);
      document.documentElement.style.setProperty(
        '--service-container-width',
        `${containerWidth}px`
      );
    }
  }, [containerRef]);

  const sortedArray = serviceArray.sort((a, b) => {
    const numA = a.data.service_index ?? 0;
    const numB = b.data.service_index ?? 0;
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
          <FadeIn multiplier={0.1} delay={0} yDown={500} duration={1}>
            <div className={styles.subtitle}>
              <Arrow height="16" />
              <PrismicRichText field={servicesMain.data.service_subtitle} />
            </div>
          </FadeIn>
          <FadeIn multiplier={0.1} delay={0} yDown={2000} duration={2}>
            <div className={styles.description}>
              <PrismicRichText field={servicesMain.data.description} />
            </div>
          </FadeIn>
        </div>
      </div>
      <FadeIn multiplier={0.1} delay={0} yDown={500} duration={1}>
        <ServiceMarquee />
      </FadeIn>
      <div className={styles.scrollContainer}>
        {sortedArray.map((service, index) => (
          <div key={`${service.id}-${index}`}>
            <Service
              service={service}
              activeService={activeService}
              setActiveService={setActiveService}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComponent;
