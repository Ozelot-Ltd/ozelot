import { useRef, useState } from 'react';
import styles from './ServiceItems.module.css';
import ServiceItem from './ServiceItem';
import { ServicenewDocument } from '@/prismicio-types';
import Overlay from './Overlay';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export type ServiceItemsProps = {
  service: ServicenewDocument;
};

export default function ServiceItems({ service }: ServiceItemsProps) {
  const [isActive, setIsActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.itemWrapper}`,
        { y: 200 },
        {
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.topicitems} ref={containerRef}>
      {service.data.description_items.map((item, index) => (
        <div className={styles.itemWrapper} key={`${item.item_title}-${index}`}>
          <ServiceItem
            item={item}
            isActive={isActive}
            setIsActive={setIsActive}
            index={index}
            id={service.id}
          />
        </div>
      ))}
      <Overlay service={service} />
    </div>
  );
}
