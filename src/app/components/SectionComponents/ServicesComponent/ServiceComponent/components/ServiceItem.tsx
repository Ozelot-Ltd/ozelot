import { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import {
  ServicenewDocumentDataDescriptionItemsItem,
  Simplify
} from '@/prismicio-types';
import styles from './ServiceItem.module.css';
import { asText } from '@prismicio/client';
import { Dispatch, SetStateAction } from 'react';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';

type ServiceItemProps = {
  item: Simplify<ServicenewDocumentDataDescriptionItemsItem>;
  isActive: number | null;
  setIsActive: Dispatch<SetStateAction<number | null>>;
  index: number;
  id: string;
};

export default function ServiceItem({
  item,
  isActive,
  index,
  setIsActive,
  id
}: ServiceItemProps) {
  const [firstString, secondString] = asText(item.item_title).split('&');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { setActiveService, setIsContainerOpen } = useActiveServiceStore();

  return (
    <div
      className={styles.item}
      style={{ scale: isHovered ? 1.025 : 1 }}
      onClick={() => {
        isActive !== index ? setIsActive(index) : setIsActive(null);
        setActiveService(asText(item.item_title) as string);
        setIsContainerOpen(id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.title}>
        <div className={styles.upperTitle}>
          <h5>{firstString}</h5> <h5>&</h5>
        </div>
        <div>
          <h5>{secondString}</h5>
        </div>
      </div>
      <div style={{ opacity: 0 }}>
        <PrismicRichText field={item.item} />
      </div>
      <div className={styles.crosscontainer}>
        <div className={styles.cross}>
          <div className={styles.inner}>
            <div className={styles.rotated}></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
