'use client';

import React from 'react';

import styles from './MobileNavigation.module.css';
import NavigationContent from './NavigationContent';

export type MobileNavigationProps = {
  isNavigationActive?: boolean;
  setIsNavigationActive?: React.Dispatch<React.SetStateAction<boolean>>;
  isClicked?: string;
  setIsClicked?: (value: string) => void;
};

export default function MobileNavigation({
  isNavigationActive,
  setIsNavigationActive,
  isClicked = '',
  setIsClicked,
}: MobileNavigationProps) {
  return (
    <div className={styles.mobileNavigation}>
      <NavigationContent
        isNavigationActive={isNavigationActive}
        setIsNavigationActive={setIsNavigationActive}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    </div>
  );
}
