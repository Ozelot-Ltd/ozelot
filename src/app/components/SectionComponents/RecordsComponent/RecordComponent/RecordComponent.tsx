'use client';

import React, { useEffect, useState } from 'react';

import styles from './RecordComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

export default function RecordComponent({
  isRecordsActive,
  transitionEnd,
}: {
  isRecordsActive: boolean;
  transitionEnd: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const { recordArray } = useContents();

  console.log(recordArray);

  useEffect(() => {
    if (isRecordsActive && transitionEnd) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isRecordsActive, transitionEnd]);

  return (
    <div className={styles.container}>
      <div className={styles.test}>
        <div
          className={`${styles.testComponent} ${isVisible && styles.hello}`}
        ></div>
      </div>
    </div>
  );
}
