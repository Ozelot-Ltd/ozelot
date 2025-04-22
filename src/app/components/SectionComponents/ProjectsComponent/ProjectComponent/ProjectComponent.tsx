'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';

import styles from '../../RecordsComponent/RecordComponent/RecordComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import { useRouter } from 'next/navigation';
import ImageComponent from '../../RecordsComponent/ImageComponent/ImageComponent';
import Project from './components/Project';
import DescriptionComponent from '../../RecordsComponent/DescriptionComponent/DescriptionComponent';

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
  const { projectArray, servicesOffered } = useContents();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState('');
  const [filter, setFilter] = useState('all');

  const sortedArray = projectArray.sort((a, b) => {
    const numA = a.data.project_number ?? 0;
    const numB = b.data.project_number ?? 0;
    return numB - numA;
  });

  useLayoutEffect(() => {
    if (filter === 'all') {
    }
  }, [filter]);

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
            {servicesOffered.data.services_offered.map((service) => (
              <div
                key={service.service}
                onClick={() => {
                  setFilter(
                    filter === service.service ? 'all' : (service.service ?? '')
                  );
                }}
                className={`${styles.discipline} ${filter === service.service ? styles.filterActive : ''}`}
              >
                <p>{service.service}</p>
              </div>
            ))}
          </div>
          <div className={styles.scrollContainer}>
            {sortedArray.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className={styles.listComponent}
                onClick={() => {
                  setActiveProject(project.id);
                  router.replace(`/projects/${project.uid}`, undefined);
                }}
              >
                <Project project={project} activeProject={activeProject} />
              </div>
            ))}
          </div>
        </div>
        <DescriptionComponent currentProject={currentProject} styles={styles} />
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.imageContainer}>
          <ImageComponent currentProject={currentProject} />
        </div>
      </section>
    </div>
  );
}
