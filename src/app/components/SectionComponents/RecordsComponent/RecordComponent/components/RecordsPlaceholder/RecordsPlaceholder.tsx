'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RecordsPlaceholder.module.css';
import { RecordDocument } from '../../../../../../../../prismicio-types';
import { initPhysics } from './Matter';
import { useMobile } from '../../../../../../../../context/MobileContext';

type RecordsPlaceholderProps = {
  releaseNames?: (string | undefined)[];
  recordArray?: RecordDocument[];
  setActiveRecord?: (id: string) => void;
};

export default function RecordsPlaceholder({
  recordArray,
  setActiveRecord,
}: RecordsPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const { isMobile } = useMobile();
  const handleRecordDrop = useCallback(
    (recordIndex: number) => {
      if (recordArray && recordArray[recordIndex] && setActiveRecord) {
        const recordId =
          recordArray[recordIndex].id || recordArray[recordIndex].uid;
        setActiveRecord(recordId);
        console.log(
          'Record dropped in dropzone:',
          recordArray[recordIndex].data.record_title
        );
      }
    },
    [recordArray, setActiveRecord]
  );

  useEffect(() => {
    if (containerRef.current && dropzoneRef.current) {
      // Pass the callback function and dropzone element to initPhysics
      initPhysics(
        containerRef.current,
        isMobile,
        handleRecordDrop,
        dropzoneRef.current
      );
    }
  }, [isMobile, recordArray, handleRecordDrop]);

  const oddURL =
    'https://images.prismic.io/ozelot/aIy07aTt2nPbZpWf_Bildschirmfoto2025-08-01um14.36.56.png?auto=format,compress';
  const evenURL =
    'https://images.prismic.io/ozelot/aIy0WaTt2nPbZpWK_Bildschirmfoto2025-08-01um14.34.20.png?auto=format,compress';

  return (
    <div className={styles.placeholderContainer} ref={containerRef}>
      <div
        className={styles.dropzone}
        ref={dropzoneRef}
        style={{ opacity: isDragging ? 0.5 : 0 }}
      >
        <h2>Put the needle on the record</h2>
      </div>

      {recordArray?.map((record, index) => {
        const imageUrl =
          record.data.record_images[0]?.record_image.url ||
          record.data.meta_image;

        return (
          <div
            key={index}
            className={`${styles.object} object`}
            data-record-index={index} // Add data attribute for Matter.js to reference
            onMouseEnter={() => setHoveredIndex(index)}
            style={{
              backgroundImage: `${hoveredIndex === index ? `url("${imageUrl}")` : `url("${index % 2 === 0 ? evenURL : oddURL}")`}`,
              transition: 'background-image 0.2s var(--bezier',
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <h2>
              {record.data.record_title
                ?.replace(/_/g, ' ')
                .replace(/\b(EP|LP)\b/g, '')
                .trim()}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
