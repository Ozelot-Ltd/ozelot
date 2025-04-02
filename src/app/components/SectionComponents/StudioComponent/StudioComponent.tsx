import React from 'react';
import MainContainer from '../MainContainer';
import StudioContent from './components/StudioContent';

export default function StudioComponent({
  isStudioActive,
  transitionEnd,
}: {
  isStudioActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <MainContainer>
      {isStudioActive && transitionEnd && (
        <StudioContent
          isStudioActive={isStudioActive}
          transitionEnd={transitionEnd}
        />
      )}
    </MainContainer>
  );
}
