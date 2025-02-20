import React from 'react';
import MainContainer from '../MainContainer';

export default function StudioComponent({
  isStudioActive,
  transitionEnd,
}: {
  isStudioActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <MainContainer>
      {transitionEnd && isStudioActive && <h1>HEHEHEHEHEHEHEHE</h1>}
    </MainContainer>
  );
}
