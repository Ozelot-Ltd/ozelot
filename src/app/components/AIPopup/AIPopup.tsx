'use client';

import React, { useState, useEffect } from 'react';
import styles from './AIPopup.module.css';
import { useContents } from '../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import { usePathname } from 'next/navigation';

import { isSplashscreenFinishedStore } from '@/app/stores/SplashscreenIsFinished';
import { PrismicNextLink } from '@prismicio/next';
import Arrow from '../SvgComponents/Arrow/Arrow';

export default function AIPopup() {
  const { aiPopup } = useContents();
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  const { isSplashscreenFinished } = isSplashscreenFinishedStore();

  const pathname = usePathname();

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenClosed(!hasBeenClosed);
    localStorage.setItem('aiPopupClosed', 'true');
  };

  useEffect(() => {
    if (isSplashscreenFinished) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isSplashscreenFinished]);

  return (
    pathname === '/' &&
    aiPopup && (
      <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
        <div className={styles.popupContainer}>
          <div className={styles.cross} onClick={handleClose}>
            <div className={styles.crossLines}>
              <div className={styles.string}></div>
              <div className={styles.string}></div>
            </div>
          </div>
          <div className={styles.popup}>
            <PrismicRichText field={aiPopup.data.title} />
            <PrismicRichText field={aiPopup.data.text} />
            <div className={styles.cta} onClick={handleClose}>
              <PrismicNextLink field={aiPopup.data.cta} />
              <Arrow height="12" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
