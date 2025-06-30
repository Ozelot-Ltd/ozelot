'use client';

import React from 'react';

import { MobileNavigationProps } from './MobileNavigation';

import styles from './MobileNavigation.module.css';
import Hamburger from './Hamburger';
import Cross from './Cross';

export default function NavigationContent({
  isNavigationActive,
  setIsNavigationActive,
  isClicked = '',
  setIsClicked,
}: MobileNavigationProps) {
  const handleClick = () => {
    if (setIsNavigationActive) {
      setIsNavigationActive(!isNavigationActive);
    }
    if (isClicked !== '' && setIsClicked) {
      setIsClicked('');
    }
  };
  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <div
        className={`${styles.overflowcontainer} ${isNavigationActive ? styles.crossactive : ''}`}
      >
        <Hamburger
          isNavigationActive={isNavigationActive}
          setIsNavigationActive={setIsNavigationActive}
        />
        <Cross
          isNavigationActive={isNavigationActive}
          setIsNavigationActive={setIsNavigationActive}
        />
      </div>
    </div>
  );
}
