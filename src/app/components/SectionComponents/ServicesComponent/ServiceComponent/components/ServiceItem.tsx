type ServiceItemProps = {
  item: Simplify<ServicenewDocumentDataDescriptionItemsItem>;
};

import { PrismicRichText } from '@prismicio/react';
import {
  ServicenewDocumentDataDescriptionItemsItem,
  Simplify
} from '@/prismicio-types';
import styles from './ServiceItem.module.css';

export default function ServiceItem({ item }: ServiceItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.item}>
        <PrismicRichText field={item.item_title} />
        <PrismicRichText field={item.item} />
      </div>
    </div>
  );
}
