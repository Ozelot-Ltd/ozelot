'use client';

import React from 'react';

type Props = {
  isNavigationClicked?: boolean;
  setIsNavigationClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  isClicked?: string;
  setIsClicked?: (value: string) => void;
};

import styles from './MobileNavigation.module.css';
import Hamburger from './Hamburger';
import Cross from './Cross';

export default function NavigationContent({
  isNavigationClicked,
  setIsNavigationClicked,
  isClicked = '',
  setIsClicked,
}: Props) {
  const handleClick = () => {};
  return (
    <div
      className={styles.container}
      onClick={() =>
        setIsNavigationClicked && setIsNavigationClicked(!isNavigationClicked)
      }
    >
      <div
        className={`${styles.overflowcontainer} ${isNavigationClicked ? styles.crossactive : ''}`}
      >
        <Hamburger
          isNavigationClicked={isNavigationClicked}
          setIsNavigationClicked={setIsNavigationClicked}
        />
        <Cross
          isNavigationClicked={isNavigationClicked}
          setIsNavigationClicked={setIsNavigationClicked}
        />
      </div>
    </div>
  );
}
