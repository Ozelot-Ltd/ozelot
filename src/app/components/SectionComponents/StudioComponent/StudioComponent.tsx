import React from 'react';
import MainContainer from '../MainContainer';
import StudioContent from './components/StudioContent';

import { useContents } from '../../../../../context/ContentContext';

export default function StudioComponent({
  isStudioActive,
  transitionEnd,
}: {
  isStudioActive: boolean;
  transitionEnd: boolean;
}) {
  console.log(isStudioActive, transitionEnd);

  const { studio } = useContents();

  return (
    <MainContainer>
      {isStudioActive && transitionEnd && (
        <StudioContent
          isStudioActive={isStudioActive}
          transitionEnd={transitionEnd}
          studio={studio}
        />
      )}
    </MainContainer>
  );
}
