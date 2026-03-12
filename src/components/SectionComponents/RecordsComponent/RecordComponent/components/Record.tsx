'use client';

import { useEffect, useRef } from 'react';

import styles from './Record.module.css';

import { PrismicRichText } from '@prismicio/react';

import { RecordDocument } from '@/prismicio-types';

import FadeIn from '@/components/FadeIn/FadeIn';
import Vinyl from '@/components/SvgComponents/Vinyl/Vinyl';
import Arrow from '@/components/SvgComponents/Arrow/Arrow';

export default function Record({
  record,
  activeRecord,
  index
}: {
  record: RecordDocument;
  activeRecord: string;
  index?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      document.body.style.setProperty(
        '--container-height',
        `${containerHeight}px`
      );
    }
  }, []);
  return (
    <FadeIn stylesProps={styles} delay={index} multiplier={0.1}>
      <div
        ref={containerRef}
        className={`${styles.releaseComponent} ${activeRecord === record.uid ? styles.active : ''}`}
        style={{
          backgroundImage: `url(${activeRecord === record.uid ? record.data.record_images?.[0]?.record_image?.url : ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className={styles.catalogContainer}>
          <p>
            {record.data.release_number && record.data.release_number < 10
              ? `0${record.data.release_number}`
              : record.data.release_number}
          </p>
          <div
            className={`${styles.catalogText} ${activeRecord === record.uid ? styles.activeRecord : ''}`}
          >
            <PrismicRichText field={record.data.catalog} />
          </div>
        </div>
        <div className={styles.vinylContainer}>
          <Vinyl height="21" width="21" />
        </div>
        <div className={styles.arrowContainer}>
          <Arrow
            height="max(16px, min(1.2vw, 24px))"
            width="max(16px, min(1.2vw, 24px))"
          />
        </div>{' '}
      </div>
    </FadeIn>
  );
}
