import { useRef, useState } from 'react';
import {
  ProjectDocumentData,
  RecordDocumentData,
  Simplify
} from '@/prismicio-types';

import { PrismicNextImage } from '@prismicio/next';

import styles from './ImageComponent.module.css';
import Arrow from '@/components/SvgComponents/Arrow/Arrow';

import Image from 'next/image';
import ComingSoonPlaceholder from '@/components/ComingSoonImage/ComingSoonPlaceholder';
import LoadingComponent from './LoadingComponent/LoadingComponent';

const ARROW_SIZE = 'max(12px, min(1.2vw, 24px))';
const CLOUD_IMG_URL = 'https://res.cloudinary.com/ddkwj78mq/image/upload/';
const CLOUD_VID_URL = 'https://res.cloudinary.com/ddkwj78mq/video/upload/';

export default function ImageComponent({
  currentRecord,
  currentProject
}: {
  currentRecord?: Simplify<RecordDocumentData> | undefined;
  currentProject?: Simplify<ProjectDocumentData> | undefined;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);

  const items = currentRecord?.record_images ?? currentProject?.gallery ?? [];
  const hasMultiple = items.length > 1;

  const navigate = (direction: 1 | -1) => {
    if (items.length > 0) {
      setIsLoading(true);
      setCurrentIndex((prev) => (prev + direction + items.length) % items.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setDragOffset(e.touches[0].clientX - touchStartX.current);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      navigate(dragOffset < 0 ? 1 : -1);
    }
    setDragOffset(0);
  };

  const renderMedia = () => {
    if (currentRecord?.record_images?.[currentIndex]) {
      return (
        <PrismicNextImage
          field={currentRecord.record_images[currentIndex].record_image}
          className={styles.sliderImageRecord}
          onLoad={() => setIsLoading(false)}
        />
      );
    }

    if (currentProject?.gallery?.[currentIndex]) {
      const item = currentProject.gallery[currentIndex];
      if (item.media_type === 'video') {
        return (
          <video
            src={`${CLOUD_VID_URL}/${item.asset_id}.mp4`}
            controls={false}
            autoPlay
            loop
            muted
            playsInline
            className={styles.sliderVideoProject}
            onCanPlay={() => setIsLoading(false)}
          />
        );
      }
      return (
        <Image
          src={`${CLOUD_IMG_URL}/${item.asset_id}.jpg`}
          alt={item.alt_text || 'Project Image'}
          width={800}
          height={600}
          className={styles.sliderImageProject}
          onLoadingComplete={() => setIsLoading(false)}
        />
      );
    }

    return <ComingSoonPlaceholder />;
  };

  return (
    <div className={styles.imageContainer}>
      <div
        className={styles.sliderContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {hasMultiple && (
          <button
            onClick={() => navigate(-1)}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous image"
          >
            <Arrow height={ARROW_SIZE} width={ARROW_SIZE} />
          </button>
        )}

        <div
          className={styles.imageWrapper}
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {isLoading && <LoadingComponent />}
          {renderMedia()}
        </div>

        {hasMultiple && (
          <button
            onClick={() => navigate(1)}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next image"
          >
            <Arrow height={ARROW_SIZE} width={ARROW_SIZE} />
          </button>
        )}
      </div>

      <div className={styles.imageCounter}>
        {items.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
