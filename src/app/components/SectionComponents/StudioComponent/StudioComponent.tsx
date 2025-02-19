import React from 'react';

import styles from './StudioComponent.module.css';
import animationStyles from '../AnimationStyles.module.css';

export default function StudioComponent({
  isStudioActive,
  transitionEnd,
}: {
  isStudioActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <div
      className={`${styles.section} ${isStudioActive && transitionEnd ? animationStyles.visible : ''}`}
    >
      <h1>HUEHUEHUEHUE</h1>
    </div>
  );
}
