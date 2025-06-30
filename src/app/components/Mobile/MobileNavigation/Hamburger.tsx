'use client';

import React from 'react';

type Props = {
  isNavigationActive?: boolean;
  setIsNavigationActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

import styles from './MobileNavigation.module.css';

export default function Hamburger({
  isNavigationActive,
  setIsNavigationActive,
}: Props) {
  return (
    <div
      className={styles.hamburger}
      onClick={() =>
        setIsNavigationActive && setIsNavigationActive(!isNavigationActive)
      }
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
