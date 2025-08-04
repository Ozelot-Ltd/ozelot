'use client';

import React, { useState, useEffect } from 'react';
import styles from './AIPopup.module.css';
import { useContents } from '../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import { usePathname } from 'next/navigation';

export default function AIPopup() {
  const { aiPopup } = useContents();
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  const pathname = usePathname();

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenClosed(!hasBeenClosed);
    localStorage.setItem('aiPopupClosed', 'true');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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
          </div>
        </div>
      </div>
    )
  );
}
