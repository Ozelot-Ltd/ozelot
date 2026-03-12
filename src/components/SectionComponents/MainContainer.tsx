import React from 'react';

import styles from './MainContainer.module.css';

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.main}>{children}</div>;
}
