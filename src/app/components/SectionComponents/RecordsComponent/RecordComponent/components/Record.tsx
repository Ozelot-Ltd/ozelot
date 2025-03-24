import React from 'react';

import styles from './Record.module.css';

import { PrismicRichText } from '@prismicio/react';
import Vinyl from '@/app/components/SvgComponents/Vinyl/Vinyl';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import { RecordDocument } from '../../../../../../../prismicio-types';

export default function Record({
  record,
  activeRecord,
}: {
  record: RecordDocument;
  activeRecord: string;
}) {
  return (
    <div
      className={`${styles.releaseComponent} ${activeRecord === record.id ? styles.active : ''}`}
    >
      <div className={styles.catalogContainer}>
        <p>
          {record.data.release_number && record.data.release_number < 10
            ? `0${record.data.release_number}`
            : record.data.release_number}
        </p>
        <PrismicRichText field={record.data.catalog} />
      </div>
      <div className={styles.vinylContainer}>
        <Vinyl height="21" width="20" fill="#494C4F" />
      </div>
      <div className={styles.arrowContainer}>
        <Arrow height="20" width="20" fill="#494C4F" />
      </div>
    </div>
  );
}
