'use client';

import { MobileNavigationProps } from './MobileNavigation';

import styles from './MobileNavigation.module.css';
import Hamburger from './Hamburger';
import Cross from './Cross';

export default function NavigationContent({
  isNavigationActive,
  setIsNavigationActive
}: MobileNavigationProps) {
  const handleClick = () => {
    if (setIsNavigationActive) {
      setIsNavigationActive(!isNavigationActive);
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
        <Cross onClick={() => setIsNavigationActive?.((prev) => !prev)} />
      </div>
    </div>
  );
}
