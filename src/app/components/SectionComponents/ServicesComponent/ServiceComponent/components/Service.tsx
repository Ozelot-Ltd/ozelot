import { useRef } from 'react';

import styles from './Service.module.css';
import { ServicenewDocument } from '../../../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  service: ServicenewDocument;
};

const Service = ({ service }: Props) => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLHeadingElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scroller =
        mainContainerRef.current?.closest('[data-content]')?.parentElement;
      if (!scroller || !indexRef.current || !leftContainerRef.current) return;

      const speed = 0.1; // slower = more lag (0 = frozen, 1 = normal scroll)

      ScrollTrigger.create({
        trigger: mainContainerRef.current,
        scroller: scroller,
        start: 'top 20%',
        end: 'bottom bottom',
        markers: process.env.NODE === 'development',
        scrub: 0.1,
        onUpdate: (self) => {
          const container = leftContainerRef.current!;
          const index = indexRef.current!;
          const containerHeight = container.offsetHeight;
          const indexHeight = index.offsetHeight;
          const maxY = containerHeight - indexHeight;

          // How far the container has scrolled past the viewport top
          const scrollDistance = containerHeight * self.progress;
          const y = Math.min(Math.max(scrollDistance * (1 - speed), 0), maxY);

          gsap.to(index, {
            y,
            duration: 3,
            ease: 'power4.out',
            overwrite: true
          });
        }
      });
    },
    { scope: mainContainerRef }
  );

  return (
    <div className={`${styles.container}`} ref={mainContainerRef}>
      <div className={styles.leftcontainer} ref={leftContainerRef}>
        <div className={styles.titlecontainer}>
          <h2 className={styles.index} ref={indexRef}>
            0{service.data.index}
          </h2>
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <div className={styles.righttitle}>
          <PrismicRichText field={service.data.title} />{' '}
          <PrismicRichText field={service.data.subtitle} />
        </div>
        <div className={styles.description}>
          <PrismicRichText field={service.data.description} />
        </div>
      </div>
    </div>
  );
};

export default Service;
