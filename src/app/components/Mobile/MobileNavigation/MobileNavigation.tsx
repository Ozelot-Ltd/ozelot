'use client';

import React, { Dispatch, SetStateAction } from 'react';

type MobileNavigationProps = {
  router: {
    push: (path: string) => void;
  };
  isNavigationClicked?: boolean;
  setIsNavigationClicked?: Dispatch<SetStateAction<boolean>>;
};

import styles from './MobileNavigation.module.css';
import NavigationContent from './NavigationContent';

export default function MobileNavigation({
  isNavigationClicked = false,
  setIsNavigationClicked,
}: MobileNavigationProps) {
  return (
    <div className={styles.mobileNavigation}>
      <NavigationContent
        isNavigationClicked={isNavigationClicked}
        setIsNavigationClicked={setIsNavigationClicked}
      />
    </div>
  );
}
