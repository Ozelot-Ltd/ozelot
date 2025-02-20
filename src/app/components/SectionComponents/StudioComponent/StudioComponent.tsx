import React from 'react';

import styles from './StudioComponent.module.css';
import animationStyles from '../AnimationStyles.module.css';
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
