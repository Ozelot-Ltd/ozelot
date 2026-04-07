'use client';

import { MobileNavigationProps } from '@/types';

import styles from './MobileNavigation.module.css';
import NavigationContent from './NavigationContent';

export default function MobileNavigation({
  isNavigationActive,
  setIsNavigationActive,
  isClicked = '',
  setIsClicked
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
