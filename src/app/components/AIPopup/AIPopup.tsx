import React, { useState, useEffect } from 'react';
import styles from './AIPopup.module.css';
import { useContents } from '../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

export default function AIPopup() {
  const { aiPopup } = useContents();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger the animation when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.popupContainer}>
        <div className={styles.cross} onClick={() => setIsOpen(false)}>
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
  );
}
