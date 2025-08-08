'use client';

import React, { useEffect, useState } from 'react';
import styles from './RecordComponent.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import Record from './components/Record';
import DescriptionComponent from '../DescriptionComponent/DescriptionComponent';
import ImageComponent from '../ImageComponent/ImageComponent';
import RecordsPlaceholder from './components/RecordsPlaceholder/RecordsPlaceholder';

import { useMobile } from '../../../../../../context/MobileContext';

import { isSplashscreenFinishedStore } from '@/app/stores/SplashscreenIsFinished';

export default function RecordComponent({
  isRecordsActive,
  transitionEnd,
}: {
  isRecordsActive: boolean;
  transitionEnd?: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(false);
  const [activeRecord, setActiveRecord] = useState('');
  const { recordArray } = useContents();

  const { isSplashscreenFinished } = isSplashscreenFinishedStore();

  const { isMobile } = useMobile();

  const releaseNames = recordArray.reverse().map((record) =>
    record.data.record_title
      ?.replace(/_/g, ' ')
      .replace(/\b(EP|LP)\b/g, '')
      .trim()
  );
  useEffect(() => {
    setIsVisible(isRecordsActive && (transitionEnd ?? false));
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
        <div className={styles.listContainer}>
          <div className={styles.scrollContainer}>
            {!isMobile &&
              currentRecord &&
              sortedArray.map((record, index) => (
                <div
                  key={`${record.id}-${index}`}
                  className={styles.listComponent}
                  onClick={() => {
                    setActiveRecord(record.id);
                  }}
                >
                  <Record
                    record={record}
                    activeRecord={activeRecord}
                    index={index}
                  />
                </div>
              ))}
          </div>
        </div>
        <DescriptionComponent
          currentRecord={currentRecord}
          styles={styles}
        />{' '}
      </section>
      <section className={styles.rightContainer}>
        {!currentRecord && !isMobile && isSplashscreenFinished ? (
          <div className={styles.previewContainer}>
            <RecordsPlaceholder
              releaseNames={releaseNames}
              recordArray={recordArray}
              setActiveRecord={setActiveRecord}
            />
          </div>
        ) : currentRecord?.record_images &&
          currentRecord.record_images.length > 0 ? (
          <div className={styles.imageContainer}>
            <ImageComponent currentRecord={currentRecord} />{' '}
          </div>
        ) : null}
      </section>
    </section>
  );
}
