'use client';

import React, { useRef, useEffect } from 'react';
import { ProjectDocument } from '../../../../../../../prismicio-types';

import styles from './Project.module.css';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import IconSwitchComponent from '@/app/components/SvgComponents/IconSwitchComponent/IconSwitchComponent';
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

  return (
    <FadeIn stylesProps={styles} delay={index}>
      <div
        ref={containerRef}
        className={`${styles.projectComponent} ${activeProject === project.id ? styles.active : ''}`}
      >
        <div className={styles.catalogContainer}>
          <p>
            {project.data.project_number && project.data.project_number < 10
              ? `0${project.data.project_number}`
              : project.data.project_number}
          </p>
          <PrismicRichText field={project.data.list_title} />
        </div>
        <div className={styles.iconContainer}>
          <IconSwitchComponent currentProject={project.data} />
        </div>
        <div className={styles.arrowContainer}>
          <Arrow height="20" width="20" fill="#494C4F" />
        </div>
      </div>
    </FadeIn>
  );
}
