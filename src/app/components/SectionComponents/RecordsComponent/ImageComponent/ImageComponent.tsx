import React, { useState, useEffect } from 'react';
import {
  ProjectDocumentData,
  RecordDocumentData,
  Simplify,
} from '../../../../../../prismicio-types';

import { PrismicNextImage } from '@prismicio/next';

import styles from './ImageComponent.module.css';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

import Image from 'next/image';

export default function ImageComponent({
  currentRecord,
  currentProject,
}: {
  currentRecord?: Simplify<RecordDocumentData> | undefined;
  currentProject?: Simplify<ProjectDocumentData> | undefined;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const url = 'https://res.cloudinary.com/ddkwj78mq/image/upload/';
  const videourl = 'https://res.cloudinary.com/ddkwj78mq/video/upload/';

  const totalImages = currentRecord
    ? currentRecord?.record_images?.length
    : currentProject
      ? currentProject?.gallery?.length
      : 0;

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentRecord, currentProject]);

  const nextImage = () => {
    if (totalImages > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

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
        (currentProject && currentProject?.gallery?.length > 1) ? (
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
          ) : currentProject?.gallery[currentIndex].media_type === 'image' ? (
            <Image
              src={`${url}/${currentProject.gallery[currentIndex].asset_id}.jpg`}
              alt={
                currentProject.gallery[currentIndex].alt_text || 'Project Image'
              }
              width={800}
              height={600}
              className={styles.sliderImageProject}
            />
          ) : currentProject?.gallery[currentIndex].media_type === 'video' ? (
            <video
              src={`${videourl}/${currentProject.gallery[currentIndex].asset_id}.mp4`}
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              className={styles.sliderVideoProject}
            />
          ) : (
            <h3>No Image Available</h3>
          )}
        </div>

        {(currentRecord && currentRecord?.record_images?.length > 1) ||
          (currentProject && currentProject?.gallery?.length > 1 && (
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
