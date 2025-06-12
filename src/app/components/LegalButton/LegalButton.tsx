import React from 'react';
import Arrow from '../SvgComponents/Arrow/Arrow';
import FadeIn from '../FadeIn/FadeIn';

import { isLegalVisibleStore } from '@/app/stores/IsLegalVisible';

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
      <p>Legal Notice & Privacy Policy</p>
      <span style={{ transform: 'translateY(3.5px) rotate(-45deg)' }}>
        <Arrow height="11" />
      </span>
    </FadeIn>
  );
}
