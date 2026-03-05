import { Dispatch, SetStateAction, useState } from 'react';
import styles from './ServiceItems.module.css';
import ServiceItem from './ServiceItem';
import { ServicenewDocument } from '@/prismicio-types';

export type ServiceItemsProps = {
  service: ServicenewDocument;
  setIsContainerOpen: Dispatch<SetStateAction<string>>;
};

export default function ServiceItems({
  service,
  setIsContainerOpen
}: ServiceItemsProps) {
  const [isActive, setIsActive] = useState<number | null>(null);

  return (
    <div className={styles.topicitems}>
      {service.data.description_items.map((item, index) => (
        <ServiceItem
          item={item}
          key={`${item.item_title}-${index}`}
          isActive={isActive}
          setIsActive={setIsActive}
          index={index}
          id={service.id}
          setIsContainerOpen={setIsContainerOpen}
        />
      ))}
    </div>
  );
}
