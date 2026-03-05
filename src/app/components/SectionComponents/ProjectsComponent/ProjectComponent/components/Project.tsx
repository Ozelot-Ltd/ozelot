'use client';

import { useRef, useEffect } from 'react';
import { ProjectDocument } from '@/prismicio-types';

import styles from './Project.module.css';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import FadeIn from '@/app/components/FadeIn/FadeIn';

type Props = {
  project: ProjectDocument;
  activeProject: string;
  index?: number;
};

export default function Project({ project, activeProject, index }: Props) {
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

  const url = 'https://res.cloudinary.com/ddkwj78mq/image/upload/';
  const videourl = 'https://res.cloudinary.com/ddkwj78mq/video/upload/';

  const backgroundMedia =
    activeProject === project.id ? project.data.gallery[0] : null;

  return (
    <FadeIn stylesProps={styles} delay={index} multiplier={0.1}>
      <div
        ref={containerRef}
        className={`${styles.projectComponent} ${activeProject === project.id ? styles.active : ''}`}
        style={{ position: 'relative' }}
      >
        {backgroundMedia &&
          (backgroundMedia.media_type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1
              }}
            >
              <source
                src={`${videourl}${backgroundMedia.asset_id}`}
                type="video/mp4"
              />
            </video>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${url}${backgroundMedia.asset_id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: -1
              }}
            />
          ))}
        <div className={styles.catalogContainer}>
          <p>
            {project.data.project_number && project.data.project_number < 10
              ? `0${project.data.project_number}`
              : project.data.project_number}
          </p>
          <PrismicRichText field={project.data.list_title} />
        </div>{' '}
        <div className={styles.arrowContainer}>
          <Arrow
            height="max(12px, min(1.2vw, 24px))"
            width="max(12px, min(1.2vw, 24px))"
          />
        </div>
      </div>
    </FadeIn>
  );
}
