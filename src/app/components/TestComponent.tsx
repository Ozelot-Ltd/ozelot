'use client';

import React, { useRef, useEffect } from 'react';
import styles from './TestComponent.module.css';
import { PrismicNextLink } from '@prismicio/next';
import { GroupField } from '@prismicio/client';
import { Simplify } from '../../../prismicio-types';

import {
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem,
} from '../../../prismicio-types';

import Logo from './Logo/Logo';

export default function TestComponent({
  left,
  right,
}: {
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        document.documentElement.style.setProperty(
          '--container-width',
          `${width}px`
        );
      }
    };

    updateContainerWidth();

    window.addEventListener('resize', updateContainerWidth);

    // Update when content might change
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo height={'50'} />
      </div>
      <div className={`${styles.nav} ${styles.left}`} ref={containerRef}>
        {left.map((item, index) => {
          return (
            <div
              className={styles.column}
              key={index}
              id={item.navigation_link.text?.toLowerCase()}
            >
              <PrismicNextLink field={item.navigation_link}>
                <p>{item.navigation_link.text}</p>
                <p>0{item?.navigation_link_number}</p>
              </PrismicNextLink>
            </div>
          );
        })}
      </div>
      <div className={`${styles.nav} ${styles.right}`}>
        {right.map((item, index) => {
          return (
            <div
              className={styles.column}
              key={index}
              id={item.navigation_link.text?.toLowerCase()}
            >
              <PrismicNextLink field={item.navigation_link}>
                <p>{item.navigation_link.text}</p>
                <p>0{item?.navigation_link_number}</p>
              </PrismicNextLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
