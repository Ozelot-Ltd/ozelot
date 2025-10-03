import React, { useRef, useEffect, useState, useCallback } from 'react';

import styles from './Service.module.css';
import { ServiceDocument } from '../../../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import ArtDirection from '@/app/components/SvgComponents/ArtDirection/ArtDirection';
import WebIcon from '@/app/components/SvgComponents/WebIcon/WebIcon';
import GraphicDesignIcon from '@/app/components/SvgComponents/GraphicDesign/GraphicDesign';
import ThreeD from '@/app/components/SvgComponents/ThreeD/ThreeD';
import SoundDesignIcon from '@/app/components/SvgComponents/SoundDesign/SoundDesign';
import Branding from '@/app/components/SvgComponents/Branding/Branding';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

import { useMobile } from '../../../../../../../context/MobileContext';

import { useRouter } from 'next/navigation';

import AIIcon from '@/app/components/SvgComponents/AI/AI';

type Props = {
  service: ServiceDocument;
  activeService: string;
  setActiveService: (uid: string) => void;
};

const Service = ({ service, activeService, setActiveService }: Props) => {
  const index = service.data.service_index ?? 0;
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const upperContainerRef = useRef<HTMLDivElement>(null);
  const lowerContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const { isMobile } = useMobile();

  useEffect(() => {
    if (
      upperContainerRef.current &&
      lowerContainerRef.current &&
      mainContainerRef.current
    ) {
      const upperHeight = upperContainerRef.current.offsetHeight;
      const lowerHeight = lowerContainerRef.current.offsetHeight;
      mainContainerRef.current.style.setProperty(
        '--upper-height',
        `${upperHeight}px`
      );
      mainContainerRef.current.style.setProperty(
        '--lower-height',
        `${lowerHeight}px`
      );
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (
      upperContainerRef.current &&
      lowerContainerRef.current &&
      mainContainerRef.current
    ) {
      setIsExpanded(!isExpanded);
      setActiveService(service.id);
    }
  }, [isExpanded, setActiveService, service.id]);

  useEffect(() => {
    if (activeService === service.uid) {
      handleToggle();
    }
  }, [activeService, service.uid, router, service.id, handleToggle]);

  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.expanded : ''} ${service.data.service_type === 'ai' ? styles.noBorder : ''}`}
      ref={mainContainerRef}
    >
      <div className={styles.upperContainer} ref={upperContainerRef}>
        <div
          className={styles.titleContainer}
          onClick={() => {
            handleToggle();
            if (!isExpanded) {
              window.sa_event?.(`services_${service.data.service_type}_opened`);
            } else {
              window.sa_event?.(`services_${service.data.service_type}_closed`);
            }
          }}
        >
          <div className={styles.index}>
            <p>{index && index < 10 ? `0${index}` : index}</p>
          </div>
          <div className={styles.title}>
            <PrismicRichText field={service.data.title} />
            <div
              className={`${styles.arrow} ${isExpanded ? styles.rotated : ''}`}
            >
              <Arrow height={isMobile ? '12' : '23'} />
            </div>
          </div>
        </div>
        <div className={styles.services}>
          {service.data.services_list.map((item, i) => (
            <div key={i} className={styles.serviceContainer}>
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
                  <GraphicDesignIcon />
                ) : service.data.service_type === 'ai' ? (
                  <AIIcon />
                ) : service.data.service_type === 'branding' ? (
                  <Branding />
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
          <div className={styles.lottieContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Service;
