'use client';

type Props = {
  onClick?: (...args: any[]) => void;
};

import styles from './MobileNavigation.module.css';

export default function Cross({ onClick }: Props) {
  return (
    <div className={styles.cross} onClick={onClick}>
      <div></div>
      <div></div>
    </div>
  );
}
