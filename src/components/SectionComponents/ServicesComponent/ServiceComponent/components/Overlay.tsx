import { useEffect } from 'react';

import { ServicenewDocument } from '@/prismicio-types';
import styles from './Overlay.module.css';

import { asText } from '@prismicio/client';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

import Arrow from '@/components/SvgComponents/Arrow/Arrow';
import ContactButton from '@/components/ContactButton/ContactButton';

import Cross from '@/components/Mobile/MobileNavigation/Cross';

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
    listItem: ({ children }) => (
      <li className={styles.listItem}>
        <Arrow height="12" width="12" fill="var(--lightgrey)" />
        <span>{children}</span>
      </li>
    )
  };

  return (
    <div
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <div className={styles.contentcontainer}>
        <div onClick={() => setIsContainerOpen('')} className={styles.cross}>
          <Arrow fill="var(--lightgrey)" />
        </div>
        <PrismicRichText field={displayedService?.item_title} />
        <div className={styles.textcontainer}>
          <PrismicRichText
            field={displayedService?.item}
            components={components}
          />
        </div>
        <ContactButton
          windowEventText={`${service.data.title} clicked`}
          variant="service"
        />
      </div>
    </div>
  );
}
