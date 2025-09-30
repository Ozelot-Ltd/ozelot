import React, { useState } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const ServiceComponent = () => {
  const { serviceArray, servicesMain } = useContents();

  const [activeService, setActiveService] = useState('');

  const url = 'https://res.cloudinary.com/ddkwj78mq/image/upload/v1759149385/';

  const sortedArray = serviceArray.sort((a, b) => {
    const numA = a.data.service_index ?? 0;
    const numB = b.data.service_index ?? 0;
    return numA - numB;
  });

  const imageLength = servicesMain.data.images?.length ?? 0;

  return (
    <div className={styles.container}>
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
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          <Marquee
            gradient={false}
            speed={20}
            autoFill={true}
            style={{
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              width: '200rem',
            }}
          >
            <div className={styles.imageContainer}>
              {servicesMain.data.images
                ?.filter(
                  (image) =>
                    typeof image.asset_id === 'string' && image.asset_id
                )
                .map((image, index) => (
                  <Image
                    key={index}
                    src={image.asset_id as string}
                    alt={image.alt || ''}
                    width={200}
                    height={200}
                    className={styles.image}
                  />
                ))}
            </div>
          </Marquee>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        {sortedArray.map((service, index) => (
          <FadeIn
            key={`${service.id}-${index}`}
            stylesProps={styles}
            multiplier={0.3}
            delay={index + 1}
            yDown={500}
            duration={1}
          >
            <Service
              service={service}
              activeService={activeService}
              setActiveService={setActiveService}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ServiceComponent;
