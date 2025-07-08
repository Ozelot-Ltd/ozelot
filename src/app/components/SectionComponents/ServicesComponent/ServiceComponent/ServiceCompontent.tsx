import React, { useState, useEffect } from 'react';

import styles from './ServiceComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import Service from './components/Service';
import FadeIn from '@/app/components/FadeIn/FadeIn';

type Props = {
  isServicesActive: boolean;
  transitionEnd: boolean;
};

const ServiceComponent = ({ isServicesActive, transitionEnd }: Props) => {
  const { serviceArray } = useContents();

  const [activeService, setActiveService] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  console.log(isVisible);

  const sortedArray = serviceArray.sort((a, b) => {
    const numA = a.data.service_index ?? 0;
    const numB = b.data.service_index ?? 0;
    return numA - numB;
  });

  useEffect(() => {
    setIsVisible(isServicesActive && transitionEnd);
  }, [isServicesActive, transitionEnd]);

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {sortedArray.map((service, index) => (
          <FadeIn
            key={`${service.id}-${index}`}
            stylesProps={styles}
            multiplier={0.1}
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
