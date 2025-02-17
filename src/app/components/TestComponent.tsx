'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './TestComponent.module.css';
import { GroupField } from '@prismicio/client';
import { Simplify } from '../../../prismicio-types';

import {
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem,
} from '../../../prismicio-types';

import Logo from './Logo/Logo';
import { PrismicNextImage } from '@prismicio/next';

export default function TestComponent({
  left,
  right,
}: {
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState('');
  const [side, setSide] = useState<'left' | 'right' | ''>('');

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
  }, []);

  const handleClick = (
    text: string | undefined | null,
    clickedSide: 'left' | 'right'
  ) => {
    if (!text) return;

    if (isClicked === text.toLowerCase() && side === clickedSide) {
      setIsClicked('');
      setSide('');
    } else {
      setIsClicked(text.toLowerCase());
      setSide(clickedSide);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.logoContainer}
        onClick={() => {
          setIsClicked('');
          setSide('');
        }}
      >
        <Logo height={'40'} />
      </div>
      <div className={`${styles.nav} ${styles.left}`} ref={containerRef}>
        {left.map((item, index) => {
          return (
            <div
              className={`${styles.column} ${
                isClicked === item.navigation_link.text?.toLowerCase() &&
                side === 'left'
                  ? styles.fullWidth
                  : ''
              }`}
              key={index}
              id={item.navigation_link.text?.toLowerCase()}
            >
              <div
                className={styles.columnContent}
                onClick={() => handleClick(item.navigation_link.text, 'left')}
              >
                <p>{item.navigation_link.text}</p>
                <PrismicNextImage field={item.navigation_icon} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${styles.nav} ${styles.right}`}>
        {right.map((item, index) => {
          return (
            <div
              className={`${styles.column} ${
                isClicked === item.navigation_link.text?.toLowerCase() &&
                side === 'right'
                  ? styles.fullWidth
                  : ''
              }`}
              key={index}
              id={item.navigation_link.text?.toLowerCase()}
            >
              <div
                className={styles.columnContent}
                onClick={() => handleClick(item.navigation_link.text, 'right')}
              >
                <p>{item.navigation_link.text}</p>
                <p>0{item?.navigation_link_number}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
