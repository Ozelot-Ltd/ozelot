import { useEffect } from 'react';

import { ServicenewDocument } from '@/prismicio-types';
import styles from './Overlay.module.css';

import { asText } from '@prismicio/client';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

import { ContactPhrase } from '@/components/SectionComponents/RecordsComponent/DescriptionComponent/ContactPhrase';

type OverlayProps = {
  service: ServicenewDocument;
};

export default function Overlay({ service }: OverlayProps) {
  const {
    activeService,

    isContainerOpen,
    setIsContainerOpen
  } = useActiveServiceStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContainerOpen) {
        setIsContainerOpen('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isContainerOpen, setIsContainerOpen]);

  const displayedService = service.data.description_items.find(
    (item) => asText(item.item_title) === activeService
  );

  const components: JSXMapSerializer = {
    paragraph: ({ children }) => <p>{children}</p>,
    heading5: () => <></>,
    list: ({ children }) => <ul className={styles.list}>{children}</ul>,
    listItem: () => <></>
  };

  return (
    <div
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <div className={styles.contentcontainer}>
        <PrismicRichText field={displayedService?.item_title} />
        <div className={styles.textcontainer}>
          <PrismicRichText
            field={displayedService?.item}
            components={components}
          />
        </div>
      </div>

      <ContactPhrase
        clickEventText={`${service.data.title} clicked`}
        color="var(--lightgrey)"
      />
    </div>
  );
}
