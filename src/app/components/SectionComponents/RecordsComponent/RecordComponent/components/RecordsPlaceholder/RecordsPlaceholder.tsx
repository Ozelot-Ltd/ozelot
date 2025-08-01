'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isMobile } = useMobile();

  useEffect(() => {
    initPhysics(containerRef.current!, isMobile);
  }, [isMobile]);

  const oddURL =
    'https://images.prismic.io/ozelot/aIy07aTt2nPbZpWf_Bildschirmfoto2025-08-01um14.36.56.png?auto=format,compress';
  const evenURL =
    'https://images.prismic.io/ozelot/aIy0WaTt2nPbZpWK_Bildschirmfoto2025-08-01um14.34.20.png?auto=format,compress';
  return (
    <div className={styles.placeholderContainer} ref={containerRef}>
      {recordArray?.map((record, index) => {
        const imageUrl =
          record.data.record_images[0]?.record_image.url ||
          record.data.meta_image;

        return (
          <div
            key={index}
            className={`${styles.object} object`}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => {
              if (recordArray && recordArray[index].id && setActiveRecord) {
                setActiveRecord(recordArray[index].id);
              }
            }}
            style={{
              backgroundImage: `${hoveredIndex === index ? `url("${imageUrl}")` : `url("${index % 2 === 0 ? evenURL : oddURL}")`}`,
              transition: 'background-image 0.2s var(--bezier',
            }}
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
