import { PrismicRichText } from '@prismicio/react';
import {
  ServicenewDocumentDataDescriptionItemsItem,
  Simplify
} from '@/prismicio-types';
import styles from './ServiceItem.module.css';
import { asText } from '@prismicio/client';
import { Dispatch, SetStateAction } from 'react';
import { isFilled } from '@prismicio/client';
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
  const { setActiveService, setIsContainerOpen } = useActiveServiceStore();

  return (
    <div
      className={styles.item}
      onClick={() => {
        isActive !== index ? setIsActive(index) : setIsActive(null);
        setActiveService(asText(item.item_title) as string);
        setIsContainerOpen(id);
      }}
    >
      <div className={styles.title}>
        <div className={styles.upperTitle}>
          <PrismicRichText field={item.item_title} />{' '}
          <>{isFilled.richText(item.item_title_second) && <h5>&</h5>}</>
        </div>
        {isFilled.richText(item.item_title_second) && (
          <div>
            <PrismicRichText field={item.item_title_second} />
          </div>
        )}
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
