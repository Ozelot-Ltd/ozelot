import { useRef } from 'react';

import styles from './Service.module.css';
import { ServicenewDocument } from '@/prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceItems from './ServiceItems';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  service: ServicenewDocument;
};

const Service = ({ service }: Props) => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLHeadingElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${styles.container}`} ref={mainContainerRef}>
      <div className={styles.leftcontainer} ref={leftContainerRef}>
        <div className={styles.titlecontainer} ref={indexRef}>
          <h2 className={styles.index}>0{service.data.index}</h2>
          <h2>–</h2>
          <div className={styles.titletext}>
            <PrismicRichText field={service.data.title} />
          </div>
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <div className={styles.uppercontainer}>
          <div className={styles.subtitle}>
            <PrismicRichText field={service.data.subtitle} />
          </div>
          <div className={styles.interludecontainer}>
            <PrismicRichText field={service.data.interlude} />
          </div>
        </div>
        <ServiceItems service={service} />
      </div>
    </div>
  );
};

export default Service;
