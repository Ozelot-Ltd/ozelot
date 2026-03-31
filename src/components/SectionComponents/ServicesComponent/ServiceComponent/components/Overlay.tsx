import { useEffect, useRef } from 'react';

import { ServicenewDocument } from '@/prismicio-types';
import styles from './Overlay.module.css';

import { asText, isFilled } from '@prismicio/client';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

import Arrow from '@/components/SvgComponents/Arrow/Arrow';
import ContactButton from '@/components/ContactButton/ContactButton';

import { useMobile } from '@/context/MobileContext';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type OverlayProps = {
  service: ServicenewDocument;
  isActive: number | null;
  length: number;
  offset: number | null;
};

export default function Overlay({
  service,
  isActive,
  length,
  offset
}: OverlayProps) {
  const { activeService, isContainerOpen, setIsContainerOpen } =
    useActiveServiceStore();

  const overlayRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useMobile();

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
    heading5: () => <></>,
    paragraph: ({ children }) => <p>{children}</p>,
    list: ({ children }) => <ul className={styles.list}>{children}</ul>,
    listItem: ({ children }) => (
      <li className={styles.listItem}>
        <Arrow height="12" width="12" fill="var(--lightgrey)" />
        <span>{children}</span>
      </li>
    )
  };

  console.log(length, isActive);

  useGSAP(
    () => {
      if (!isMobile || isActive === null) return;

      if (isActive === length - 1) {
        const parentHeight =
          overlayRef.current?.parentElement?.clientHeight ?? 0;
        const overlayHeight = overlayRef.current?.clientHeight ?? 0;
        gsap.to(overlayRef.current, {
          top: parentHeight - overlayHeight,
          bottom: 'auto',
          duration: 0.4,
          ease: 'var(--bezier)'
        });
      } else {
        gsap.to(overlayRef.current, {
          top: `calc(${offset}px - 24px)`,
          bottom: 'auto',
          duration: 0.4,
          ease: 'var(--bezier)'
        });
      }
    },
    { dependencies: [isMobile, offset, isActive] }
  );

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <div className={styles.contentcontainer}>
        <div onClick={() => setIsContainerOpen('')} className={styles.arrow}>
          <Arrow fill="var(--lightgrey)" height="18" />
        </div>
        <div className={styles.titlecontainer}>
          <h5>
            {asText(displayedService?.item_title)}
            {isFilled.richText(displayedService?.item_title_second) &&
              ` & ${asText(displayedService.item_title_second)}`}
          </h5>
        </div>
        <div className={styles.textcontainer}>
          <PrismicRichText
            field={displayedService?.item}
            components={components}
          />
        </div>
        <div className={styles.contactcontainer}>
          <ContactButton
            windowEventText={`${service.data.title} clicked`}
            variant="service"
          />
        </div>
      </div>
    </div>
  );
}
