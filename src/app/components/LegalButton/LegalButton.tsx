import React from 'react';
import Arrow from '../SvgComponents/Arrow/Arrow';
import FadeIn from '../FadeIn/FadeIn';

import { isLegalVisibleStore } from '@/app/stores/IsLegalVisible';

import styles from './LegalButton.module.css';

export default function LegalButton() {
  const { isLegalVisible, setIsLegalVisible } = isLegalVisibleStore();
  return (
    <FadeIn
      inlineStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        gap: 'calc(0.2rem + 0.2vw)',
      }}
      delay={0.8}
      onClick={() => {
        setIsLegalVisible(!isLegalVisible);
      }}
    >
      <div className={styles.legalButton}>
        <p>Legal Notice & Privacy Policy</p>
        <Arrow height="12" />
      </div>
    </FadeIn>
  );
}
