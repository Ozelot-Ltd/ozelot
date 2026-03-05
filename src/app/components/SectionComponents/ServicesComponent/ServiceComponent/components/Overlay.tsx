import { ServicenewDocument } from '@/prismicio-types';
import styles from './Overlay.module.css';
import { Dispatch, SetStateAction } from 'react';
import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';

type OverlayProps = {
  service: ServicenewDocument;
  isContainerOpen: string;
  setIsContainerOpen: Dispatch<SetStateAction<string>>;
};

export default function Overlay({
  service,
  isContainerOpen,
  setIsContainerOpen
}: OverlayProps) {
  const { activeService } = useActiveServiceStore();

  const displayedService = service.data.description_items.find(
    (item) => asText(item.item_title) === activeService
  );

  return (
    <div
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <PrismicRichText field={displayedService?.item_title} />
      <div onClick={() => setIsContainerOpen('')}>lcose</div>
    </div>
  );
}
