import { useState } from 'react';
import {
  ProjectDocumentData,
  RecordDocumentData,
  Simplify
} from '../../../../../../prismicio-types';

import { PrismicNextImage } from '@prismicio/next';

import styles from './ImageComponent.module.css';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

import Image from 'next/image';
import ComingSoonPlaceholder from '@/app/components/ComingSoonImage/ComingSoonPlaceholder';
import LoadingComponent from './LoadingComponent/LoadingComponent';

export default function ImageComponent({
  currentRecord,
  currentProject
}: {
  currentRecord?: Simplify<RecordDocumentData> | undefined;
  currentProject?: Simplify<ProjectDocumentData> | undefined;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const url = 'https://res.cloudinary.com/ddkwj78mq/image/upload/';
  const videourl = 'https://res.cloudinary.com/ddkwj78mq/video/upload/';

  const totalImages = currentRecord
    ? currentRecord?.record_images?.length || 0
    : currentProject
      ? currentProject?.gallery?.length || 0
      : 0;

  const nextImage = () => {
    if (totalImages > 0) {
      setIsLoading(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (totalImages > 0) {
      setIsLoading(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
      );
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  // Safety check - ensure we have valid data before rendering
  const hasValidRecord =
    currentRecord &&
    currentRecord.record_images &&
    currentRecord.record_images[currentIndex];
  const hasValidProject =
    currentProject &&
    currentProject.gallery &&
    currentProject.gallery[currentIndex];

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
            <Arrow
              height="max(12px, min(1.2vw, 24px))"
              width="max(12px, min(1.2vw, 24px))"
            />
          </button>
        ) : null}

        <div className={styles.imageWrapper}>
          {isLoading && <LoadingComponent />}
          {hasValidRecord ? (
            <PrismicNextImage
              field={currentRecord.record_images[currentIndex].record_image}
              className={styles.sliderImageRecord}
              onLoad={handleImageLoad}
            />
          ) : hasValidProject &&
            currentProject.gallery[currentIndex].media_type === 'image' ? (
            <Image
              src={`${url}/${currentProject.gallery[currentIndex].asset_id}.jpg`}
              alt={
                currentProject.gallery[currentIndex].alt_text || 'Project Image'
              }
              width={800}
              height={600}
              className={styles.sliderImageProject}
              onLoadingComplete={handleImageLoad}
            />
          ) : hasValidProject &&
            currentProject.gallery[currentIndex].media_type === 'video' ? (
            <video
              src={`${videourl}/${currentProject.gallery[currentIndex].asset_id}.mp4`}
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              className={styles.sliderVideoProject}
              onCanPlay={handleVideoLoad}
            />
          ) : (
            <div>
              <ComingSoonPlaceholder />
            </div>
          )}
        </div>

        {(currentRecord && currentRecord?.record_images?.length > 1) ||
        (currentProject && currentProject?.gallery?.length > 1) ? (
          <button
            onClick={nextImage}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next image"
          >
            <Arrow
              height="max(12px, min(1.2vw, 24px))"
              width="max(12px, min(1.2vw, 24px))"
            />
          </button>
        ) : null}
      </div>

      <div className={styles.imageCounter}>
        {Array.from({ length: totalImages }).map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
