'use client';

import React from 'react';

type Props = {
  isNavigationClicked?: boolean;
  setIsNavigationClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

import styles from './MobileNavigation.module.css';

export default function Cross({
  isNavigationClicked,
  setIsNavigationClicked,
}: Props) {
  return (
    <div
      className={styles.cross}
      onClick={() =>
        setIsNavigationClicked && setIsNavigationClicked(!isNavigationClicked)
      }
    >
      <div></div>
      <div></div>
    </div>
  );
}
