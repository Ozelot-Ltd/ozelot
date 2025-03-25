'use client';

import React, { useEffect, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const { projectArray } = useContents();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState('');

  const sortedArray = projectArray.sort((a, b) => {
    const numA = a.data.project_number ?? 0;
    const numB = b.data.project_number ?? 0;
    return numB - numA;
  });

  console.log(isVisible);

  useEffect(() => {
    setIsVisible(isProjectsActive && transitionEnd);
  }, [isProjectsActive, transitionEnd]);

  const currentProject = projectArray.find(
    (project) => project.id === activeProject
  )?.data;

  return (
    <div className={styles.container}>
      <section className={styles.leftContainer}>
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
