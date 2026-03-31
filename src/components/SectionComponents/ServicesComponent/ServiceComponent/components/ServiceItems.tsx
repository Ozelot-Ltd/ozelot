import { useState } from 'react';
import styles from './ServiceItems.module.css';
import ServiceItem from './ServiceItem';
import { ServicenewDocument } from '@/prismicio-types';
import Overlay from './Overlay';

export type ServiceItemsProps = {
  service: ServicenewDocument;
};

export default function ServiceItems({ service }: ServiceItemsProps) {
  const [isActive, setIsActive] = useState<number | null>(null);
  const [offset, setOffset] = useState<number | null>(null);

  return (
    <div className={styles.topicitems}>
      {service.data.description_items.map((item, index) => (
        <ServiceItem
          key={`${item.item_title}-${index}`}
          item={item}
          isActive={isActive}
          setIsActive={setIsActive}
          index={index}
          id={service.id}
          setOffset={setOffset}
        />
      ))}
      <Overlay
        service={service}
        isActive={isActive}
        length={service.data.description_items.length}
        offset={offset}
      />
    </div>
  );
}
