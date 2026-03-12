'use client';

import { useState, useEffect } from 'react';
import styles from './RecordComponent.module.css';
import { useContents } from '@/context/ContentContext';
import Record from './components/Record';
import DescriptionComponent from '../DescriptionComponent/DescriptionComponent';
import ImageComponent from '../ImageComponent/ImageComponent';
import RecordsPlaceholder from './components/RecordsPlaceholder/RecordsPlaceholder';

import { isSplashscreenFinishedStore } from '@/stores/SplashscreenIsFinished';

import { useMobile } from '@/context/MobileContext';

import { useRouter, usePathname } from 'next/navigation';

export default function RecordComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRecord, setActiveRecord] = useState('');
  const { recordArray } = useContents();

  const { isMobile } = useMobile();

  const { isSplashscreenFinished } = isSplashscreenFinishedStore();

  const releaseNames = recordArray.map((record) =>
    record.data.record_title
      ?.replace(/_/g, ' ')
      .replace(/\b(EP|LP)\b/g, '')
      .trim()
  );
  const sortedArray = recordArray.sort((a, b) => {
    const numA = a.data.release_number ?? 0;
    const numB = b.data.release_number ?? 0;
    return numB - numA;
  });

  const currentRecord = recordArray.find(
    (record) => record.uid === activeRecord
  )?.data;

  useEffect(() => {
    const chosenRecord = recordArray.filter((record) =>
      pathname.includes(record.uid)
    );

    if (chosenRecord[0]) {
      setActiveRecord(chosenRecord[0].uid);
    }
  }, [pathname, recordArray]);

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.listContainer}>
          <div className={styles.scrollContainer}>
            {sortedArray.map((record, index) => (
              <div
                key={`${record.uid}-${index}`}
                className={styles.listComponent}
                onClick={() => {
                  setActiveRecord(record.uid);
                  router.push(`/records/${record.uid}`);
                  type TitleType = { text: string };
                  const recordTitleText = (record.data.title[0] as TitleType)
                    .text;
                  window.sa_event?.(`record_${recordTitleText}`);
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
        {!currentRecord && isSplashscreenFinished && !isMobile ? (
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
