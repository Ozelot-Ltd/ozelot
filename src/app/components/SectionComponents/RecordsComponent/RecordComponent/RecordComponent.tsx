'use client';

import React, { useEffect, useState } from 'react';
import styles from './RecordComponent.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import Record from './components/Record';
import { useRouter } from 'next/navigation';
import DescriptionComponent from '../DescriptionComponent/DescriptionComponent';
import ImageComponent from '../ImageComponent/ImageComponent';

export default function RecordComponent({
  isRecordsActive,
  transitionEnd,
}: {
  isRecordsActive: boolean;
  transitionEnd: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRecord, setActiveRecord] = useState('');
  const { recordArray } = useContents();
  const router = useRouter();

  console.log(isVisible);

  useEffect(() => {
    setIsVisible(isRecordsActive && transitionEnd);
  }, [isRecordsActive, transitionEnd]);

  const sortedArray = recordArray.sort((a, b) => {
    const numA = a.data.release_number ?? 0;
    const numB = b.data.release_number ?? 0;
    return numB - numA;
  });

  const currentRecord = recordArray.find(
    (record) => record.id === activeRecord
  )?.data;

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.releaseListContainer}>
          <div className={styles.scrollContainer}>
            {sortedArray.map((record, index) => (
              <div
                key={`${record.id}-${index}`}
                className={styles.listComponent}
                onClick={() => {
                  setActiveRecord(record.id);
                  router.replace(`/records/${record.uid}`, undefined);
                }}
              >
                <Record record={record} activeRecord={activeRecord} />
              </div>
            ))}
          </div>
        </div>
        <DescriptionComponent currentRecord={currentRecord} styles={styles} />{' '}
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.imageContainer}>
          <ImageComponent currentRecord={currentRecord} />
        </div>
      </section>
    </section>
  );
}
