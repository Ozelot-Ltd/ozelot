import React, { useState, useEffect } from 'react';
import {
  ProjectDocumentData,
  RecordDocumentData,
  Simplify,
} from '../../../../../../prismicio-types';

import { PrismicNextImage } from '@prismicio/next';

import styles from './ImageComponent.module.css';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

export default function ImageComponent({
  currentRecord,
  currentProject,
}: {
  currentRecord?: Simplify<RecordDocumentData> | undefined;
  currentProject?: Simplify<ProjectDocumentData> | undefined;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = currentRecord
    ? currentRecord?.record_images?.length
    : currentProject
      ? currentProject?.images?.length
      : 0;

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentRecord, currentProject]);

  const nextImage = () => {
    if (totalImages > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  console.log(totalImages);

  const prevImage = () => {
    if (totalImages > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
      );
    }
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.sliderContainer}>
        {(currentRecord && currentRecord?.record_images?.length > 1) ||
        (currentProject && currentProject?.images?.length > 1) ? (
          <button
            onClick={prevImage}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous image"
          >
            <Arrow />
          </button>
        ) : null}

        <div className={styles.imageWrapper}>
          {currentRecord ? (
            <PrismicNextImage
              field={currentRecord.record_images[currentIndex].record_image}
              className={styles.sliderImageRecord}
            />
          ) : currentProject ? (
            <PrismicNextImage
              field={currentProject.images[currentIndex].image}
              className={`${styles.sliderImage}`}
            />
          ) : (
            <h3>No Image Available</h3>
          )}
        </div>

        {(currentRecord && currentRecord?.record_images?.length > 1) ||
          (currentProject && currentProject?.images?.length > 1 && (
            <button
              onClick={nextImage}
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next image"
            >
              <Arrow />
            </button>
          ))}
      </div>
    </div>
  );
}
