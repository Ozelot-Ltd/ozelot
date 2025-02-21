import React from 'react';
import MainContainer from '../MainContainer';

export default function ContactComponent({
  isContactActive,
  transitionEnd,
}: {
  isContactActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <MainContainer>
      {transitionEnd && isContactActive && 'jlköfasöljkafdslöjkfdslköjfdsaklöj'}
    </MainContainer>
  );
}
