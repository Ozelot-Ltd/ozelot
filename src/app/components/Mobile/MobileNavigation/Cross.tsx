'use client';

import React from 'react';

type Props = {
  isNavigationActive?: boolean;
  setIsNavigationActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

import styles from './MobileNavigation.module.css';

export default function Cross({
  isNavigationActive,
  setIsNavigationActive,
}: Props) {
  return (
    <div
      className={styles.cross}
      onClick={() =>
        setIsNavigationActive && setIsNavigationActive(!isNavigationActive)
      }
    >
      <div></div>
      <div></div>
    </div>
  );
}
