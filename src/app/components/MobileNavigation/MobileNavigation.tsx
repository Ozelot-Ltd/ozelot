'use client';

import React, { Dispatch, SetStateAction } from 'react';

type MobileNavigationProps = {
  setIsClicked: (value: string) => void;
  router: {
    push: (path: string) => void;
  };
  isNavigationClicked?: boolean;
  setIsNavigationClicked?: Dispatch<SetStateAction<boolean>>;
  isClicked?: string;
};

import styles from './MobileNavigation.module.css';
import NavigationContent from './NavigationContent';

export default function MobileNavigation({
  setIsClicked,
  isNavigationClicked = false,
  setIsNavigationClicked,
  isClicked = '',
}: MobileNavigationProps) {
  return (
    <div className={styles.mobileNavigation}>
      <NavigationContent
        isNavigationClicked={isNavigationClicked}
        setIsNavigationClicked={setIsNavigationClicked}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    </div>
  );
}
