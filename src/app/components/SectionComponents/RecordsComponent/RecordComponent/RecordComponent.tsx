'use client';

import React, { useEffect, useState } from 'react';
import styles from './RecordComponent.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import Record from './components/Record';
import { PrismicRichText } from '@prismicio/react';
import Vinyl from '@/app/components/SvgComponents/Vinyl/Vinyl';
import { PrismicNextLink } from '@prismicio/next';
import SpotifyLogo from '@/app/components/SvgComponents/SocialsLogo/SpotifyLogo';
import BandcampLogo from '@/app/components/SvgComponents/SocialsLogo/BandcampLogo';
import Earth from '@/app/components/SvgComponents/Earth/Earth';

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
                onClick={() => setActiveRecord(record.id)}
              >
                <Record record={record} index={index} />
              </div>
            ))}
          </div>
        </div>

        {currentRecord && (
          <div className={styles.descriptionContainer}>
            <div className={styles.titleContainer}>
              <p className={styles.text}>
                {currentRecord.release_number &&
                currentRecord.release_number < 10
                  ? `0${currentRecord.release_number}`
                  : currentRecord.release_number}
              </p>
            </div>
            <div className={styles.rightContainerLower}>
              <div className={styles.title}>
                <Vinyl height="24" width="24" fill="#494C4F" />
                <div className={styles.title}>
                  <PrismicRichText field={currentRecord.record_title} />
                </div>
              </div>

              {currentRecord.has_merch && (
                <div className={styles.subtitle}>
                  <p>MERCHANDISE AVAILABLE</p>
                </div>
              )}
              <div className={styles.text}>
                <p>{currentRecord.record_text}</p>
              </div>
              <div className={styles.socials}>
                <PrismicNextLink field={currentRecord.bandcamp_link}>
                  <BandcampLogo height={24} width={24} />
                </PrismicNextLink>
                <PrismicNextLink field={currentRecord.spotify_link}>
                  <SpotifyLogo height={22} width={22} />
                </PrismicNextLink>
                {currentRecord.website_link && (
                  <PrismicNextLink field={currentRecord.website_link}>
                    <Earth height={22} width={22} />
                  </PrismicNextLink>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.imageContainer}></div>
      </section>
    </section>
  );
}
