import React from 'react';
import Arrow from '../SvgComponents/Arrow/Arrow';
import FadeIn from '../FadeIn/FadeIn';

export default function LegalButton() {
  return (
    <FadeIn
      inlineStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        gap: 'calc(0.2rem + 0.2vw)',
      }}
      delay={0.6}
    >
      <p>Legal Notice & Privacy Policy</p>
      <span style={{ transform: 'translateY(3px) rotate(-45deg)' }}>
        <Arrow height="11" />
      </span>
    </FadeIn>
  );
}
