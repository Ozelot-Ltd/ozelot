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

  console.log(totalImages);

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentRecord, currentProject]);

  // Function to go to the next image
  const nextImage = () => {
    if (totalImages > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  // Function to go to the previous image
  const prevImage = () => {
    if (totalImages > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
      );
    }
  };

  if (!currentRecord || !currentProject || !totalImages) {
    return (
      <div className={styles.imageContainerWithout}>
        {currentRecord?.meta_title}
      </div>
    );
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.sliderContainer}>
        <button
          onClick={prevImage}
          className={`${styles.navButton} ${styles.prevButton}`}
          aria-label="Previous image"
        >
          <Arrow />
        </button>

        <div className={styles.imageWrapper}>
          {currentRecord ? (
            <PrismicNextImage
              field={currentRecord.record_images[currentIndex].record_image}
              className={styles.sliderImage}
            />
          ) : currentProject ? (
            <PrismicNextImage
              field={currentProject.images[currentIndex].image}
              className={styles.sliderImage}
            />
          ) : null}
        </div>

        <button
          onClick={nextImage}
          className={`${styles.navButton} ${styles.nextButton}`}
          aria-label="Next image"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}
