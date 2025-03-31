import React, { useRef, useEffect, useState } from 'react';

import styles from './Service.module.css';
import { ServiceDocument } from '../../../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import ArtDirection from '@/app/components/SvgComponents/ArtDirection/ArtDirection';
import WebIcon from '@/app/components/SvgComponents/WebIcon/WebIcon';
import ThreeD from '@/app/components/SvgComponents/ThreeD/ThreeD';
import SoundDesignIcon from '@/app/components/SvgComponents/SoundDesign/SoundDesign';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
      <div className={styles.upperContainer} ref={upperContainerRef}>
        <div className={styles.titleContainer} onClick={handleToggle}>
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
                {service.data.service_type === '3d' ? (
                  <ThreeD />
                ) : service.data.service_type === 'art_direction' ? (
                  <ArtDirection />
                ) : service.data.service_type === 'web' ? (
                  <WebIcon />
                ) : service.data.service_type === 'sounddesign' ? (
                  <SoundDesignIcon />
                ) : service.data.service_type === 'graphic' ? (
                  <SoundDesignIcon />
                ) : (
                  ''
                )}
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
        <div className={styles.image}>
          <div className={styles.lottieContainer}>
            {service.data.service_type === 'web' && (
              <DotLottieReact
                src="https://lottie.host/541eadd1-ec51-441e-bdc8-fb6e620fca72/R7DuUC8GYy.lottie"
                loop
                autoplay
              />
            )}
            {service.data.service_type === '3d' && (
              <DotLottieReact
                src="https://lottie.host/079a73d7-583d-46f9-af62-416ec4cc342d/CNLftiWST9.lottie"
                loop
                autoplay
              />
            )}
            {service.data.service_type === 'graphic' && (
              <DotLottieReact
                src="https://lottie.host/41847dca-6480-4741-9b7f-d48e53af9147/f2vZjk0A79.lottie"
                loop
                autoplay
              />
            )}{' '}
            {service.data.service_type === 'sounddesign' && (
              <DotLottieReact
                src="https://lottie.host/7470ee5c-2c8e-4c38-aa94-1f7cec2cdd9b/T8jU7z0Z9N.lottie"
                loop
                autoplay
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
