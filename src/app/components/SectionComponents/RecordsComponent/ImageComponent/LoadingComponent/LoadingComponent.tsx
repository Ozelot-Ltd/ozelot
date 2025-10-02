'use client';

import React from 'react';

import styles from './LoadingComponent.module.css';

export default function LoadingComponent() {
  return (
    <div className={styles.loader}>
      <div className={styles.element}></div>
      <div className={styles.element}></div>
      <div className={styles.element}></div>
    </div>
  );
}
