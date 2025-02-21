'use client';

import React from 'react';

import styles from './Record.module.css';

import { PrismicRichText } from '@prismicio/react';
import Vinyl from '@/app/components/SvgComponents/Vinyl/Vinyl';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import { RecordDocument } from '../../../../../../../prismicio-types';

export default function Record({
  record,
}: {
  record: RecordDocument;
  index: number;
}) {
  return (
    <div className={styles.releaseComponent}>
      <p>
        {record.data.release_number && record.data.release_number < 10
          ? `0${record.data.release_number}`
          : record.data.release_number}
      </p>
      <PrismicRichText field={record.data.record_catalog} />
      <div className={styles.vinylContainer}>
        <Vinyl height="21" width="20" fill="#494C4F" />
      </div>
      <div className={styles.arrowContainer}>
        <Arrow height="22" width="23" fill="#494C4F" />
      </div>
    </div>
  );
}
