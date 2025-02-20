import React from 'react';
import MainContainer from '../MainContainer';

export default function ContactComponent({
  isContactActive,
  transitionEnd,
}: {
  isContactActive: boolean;
  transitionEnd: boolean;
}) {
  console.log(isContactActive);
  return (
    <MainContainer>
      {transitionEnd && isContactActive && 'jlköfasöljkafdslöjkfdslköjfdsaklöj'}
    </MainContainer>
  );
}
