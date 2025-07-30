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

import ShowAnimation from './ShowAnimation';
import AIIcon from '@/app/components/SvgComponents/AI/AI';

export const lottieSources = {
  web: 'https://lottie.host/541eadd1-ec51-441e-bdc8-fb6e620fca72/R7DuUC8GYy.lottie',
  '3d': 'https://lottie.host/079a73d7-583d-46f9-af62-416ec4cc342d/CNLftiWST9.lottie',
  graphic:
    'https://lottie.host/41847dca-6480-4741-9b7f-d48e53af9147/f2vZjk0A79.lottie',
  sounddesign:
    'https://lottie.host/7470ee5c-2c8e-4c38-aa94-1f7cec2cdd9b/T8jU7z0Z9N.lottie',
  ai: 'https://lottie.host/a118d970-7878-4236-a4eb-adcc0db89dd9/esvtMRWy0b.lottie',
  art_direction:
    'https://lottie.host/927d0e46-d27b-4af8-9b4f-68df0baf831f/0cWlaP28W9.lottie',
  branding:
    'https://lottie.host/ef3beb99-245c-44e5-a39e-566252276656/MJkPVqNYe8.lottie',
};

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
  const [showElement, setShowElement] = useState(false);
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

  useEffect(() => {
    if (isExpanded) {
      setShowElement(true);
    } else {
      setTimeout(() => {
        setShowElement(false);
      }, 500);
    }
  }, [isExpanded]);

  const handleToggle = useCallback(() => {
    if (
      upperContainerRef.current &&
      lowerContainerRef.current &&
      mainContainerRef.current
    ) {
      setIsExpanded(!isExpanded);
      setActiveService(service.id);
      router.replace(`/services/${service.uid}`, undefined);
    }
  }, [isExpanded, setActiveService, service.id, service.uid, router]);

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
        <div className={styles.titleContainer} onClick={handleToggle}>
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
            <div key={i} className={styles.service}>
              <div className={styles.icon}>
                {/* 0{index} */}
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
          <div className={styles.lottieContainer}>
            <ShowAnimation
              showElement={showElement}
              serviceType={service.data.service_type}
              lottieSources={lottieSources}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
