import React from 'react';
import MainContainer from '../MainContainer';

import Contact from './components/Contact';

export default function ContactComponent({
  isContactActive,
  transitionEnd,
}: {
  isContactActive: boolean | undefined;
  transitionEnd: boolean | undefined;
}) {
  return (
    <MainContainer>
      {isContactActive && transitionEnd && (
        <Contact
          isContactActive={isContactActive}
          transitionEnd={transitionEnd}
        />
      )}
    </MainContainer>
  );
}
