'use client';

import React, { useEffect, useState } from 'react';

import styles from '../../RecordsComponent/RecordComponent/RecordComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import ImageComponent from '../../RecordsComponent/ImageComponent/ImageComponent';
import Project from './components/Project';
import DescriptionComponent from '../../RecordsComponent/DescriptionComponent/DescriptionComponent';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import { PrismicNextImage } from '@prismicio/next';

interface ProjectComponentProps {
  isProjectsActive: boolean;
  transitionEnd: boolean;
}

export default function ProjectComponent({
  isProjectsActive,
  transitionEnd,
}: ProjectComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(false);
  const { projectArray, servicesOffered, projectsGif } = useContents();
  const [activeProject, setActiveProject] = useState('');
  const [filter, setFilter] = useState('all');

  const sortedArray = projectArray.sort((a, b) => {
    const numA = a.data.project_number ?? 0;
    const numB = b.data.project_number ?? 0;
    return numB - numA;
  });

  useEffect(() => {
    setIsVisible(isProjectsActive && transitionEnd);
  }, [isProjectsActive, transitionEnd]);

  const currentProject = projectArray.find(
    (project) => project.id === activeProject
  )?.data;

  return (
    <div className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.listContainer}>
          <div className={styles.disciplinesContainer}>
            {servicesOffered.data.services_offered.map((service, index) => (
              <FadeIn key={service.service} delay={index} multiplier={0.1}>
                <div
                  onClick={() => {
                    setFilter(
                      filter === service.service
                        ? 'all'
                        : (service.service ?? '')
                    );
                  }}
                  className={`${styles.discipline} ${filter === service.service ? styles.filterActive : ''}`}
                >
                  <p>{service.service}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className={styles.scrollContainer}>
            {sortedArray.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className={styles.listComponent}
                onClick={() => {
                  setActiveProject(project.id);
                }}
              >
                <Project
                  project={project}
                  activeProject={activeProject}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
        <DescriptionComponent currentProject={currentProject} styles={styles} />
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.imageContainer}>
          {!currentProject && (
            <div className={styles.previewContainer}>
              <PrismicNextImage
                field={projectsGif.data.projects_gif}
                className={styles.gifImage}
              />
            </div>
          )}
          {currentProject && <ImageComponent currentProject={currentProject} />}
        </div>
      </section>
    </div>
  );
}
