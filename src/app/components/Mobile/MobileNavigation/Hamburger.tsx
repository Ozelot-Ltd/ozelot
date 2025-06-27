'use client';

import React from 'react';

type Props = {
  isNavigationClicked?: boolean;
  setIsNavigationClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

import styles from './MobileNavigation.module.css';

export default function Hamburger({
  isNavigationClicked,
  setIsNavigationClicked,
}: Props) {
  return (
    <div
      className={styles.hamburger}
      onClick={() =>
        setIsNavigationClicked && setIsNavigationClicked(!isNavigationClicked)
      }
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
