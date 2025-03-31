import React, { useRef, useEffect, useState } from 'react';

import styles from './Service.module.css';
import { ServiceDocument } from '../../../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import Earth from '@/app/components/SvgComponents/Earth/Earth';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

type Props = {
  service: ServiceDocument;
  activeService: string;
};

const Service = ({ service, activeService }: Props) => {
  const index = service.data.service_index ?? 0;
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const upperContainerRef = useRef<HTMLDivElement>(null);
  const lowerContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Set the container to upper height initially
    if (upperContainerRef.current && mainContainerRef.current) {
      const upperHeight = upperContainerRef.current.offsetHeight;
      mainContainerRef.current.style.setProperty(
        '--upper-height',
        `${upperHeight}px`
      );
      mainContainerRef.current.style.height = `${upperHeight}px`;
    }
  }, []);

  useEffect(() => {
    // Check if this is the active service from props
    if (activeService === service.uid) {
      handleToggle();
    }
  }, [activeService, service.uid]);

  const handleToggle = () => {
    if (
      upperContainerRef.current &&
      lowerContainerRef.current &&
      mainContainerRef.current
    ) {
      const upperHeight = upperContainerRef.current.offsetHeight;
      const lowerHeight = lowerContainerRef.current.offsetHeight;

      if (isExpanded) {
        // Collapse: animate back to just upper height
        mainContainerRef.current.style.height = `${upperHeight}px`;
      } else {
        // Expand: animate to combined height
        mainContainerRef.current.style.height = `${upperHeight + lowerHeight}px`;
      }

      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
      ref={mainContainerRef}
    >
      <div
        className={styles.upperContainer}
        ref={upperContainerRef}
        onClick={handleToggle}
      >
        <div className={styles.titleContainer}>
          <div className={styles.index}>
            <p>{index && index < 10 ? `0${index}` : index}</p>
          </div>
          <div className={styles.title}>
            <PrismicRichText field={service.data.title} />
            <div
              className={`${styles.arrow} ${isExpanded ? styles.rotated : ''}`}
            >
              <Arrow />
            </div>
          </div>
        </div>
        <div className={styles.services}>
          {service.data.services_list.map((item, i) => (
            <div key={i} className={styles.service}>
              <div className={styles.icon}>
                <Earth />
              </div>
              <PrismicRichText field={item.listitem} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.lowerContainer} ref={lowerContainerRef}>
        <div className={styles.description}>
          <PrismicRichText field={service.data.text} />
        </div>
      </div>
    </div>
  );
};

export default Service;
