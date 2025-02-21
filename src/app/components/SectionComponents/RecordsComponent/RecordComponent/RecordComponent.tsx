'use client';

import React, { useEffect, useState } from 'react';

import styles from './RecordComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import Record from './components/Record';

export default function RecordComponent({
  isRecordsActive,
  transitionEnd,
}: {
  isRecordsActive: boolean;
  transitionEnd: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible);

  const { recordArray } = useContents();

  console.log(recordArray);

  useEffect(() => {
    if (isRecordsActive && transitionEnd) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isRecordsActive, transitionEnd]);

  const sortedArray = recordArray.sort((a, b) => {
    if (a.data.release_number && b.data.release_number) {
      return b.data.release_number - a.data.release_number;
    }
    return 0;
  });

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.releaseListContainer}>
          <div className={styles.scrollContainer}>
            {sortedArray.map((record, index: number) => (
              <div
                key={`${record.id} ${index}`}
                className={styles.listComponent}
              >
                <Record record={record} index={index} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.descriptionContainer}></div>
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.imageContainer}></div>
      </section>
    </section>
  );
}
