'use client';

import { useState, useEffect } from 'react';

import styles from './ProjectComponent.module.css';

import { useContents } from '@/context/ContentContext';

import Project from './components/Project';
import DescriptionComponent from '../../RecordsComponent/DescriptionComponent/DescriptionComponent';

import { useRouter, usePathname } from 'next/navigation';
import { ProjectDocument } from '@/prismicio-types';
import ImageContainer from './components/ImageContainer';

export default function ProjectComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const { projectArray } = useContents();
  const [activeProject, setActiveProject] = useState<string | ProjectDocument>(
    ''
  );

  const sortedArray = projectArray.sort((a, b) => {
    const numA = a.data.project_number ?? 0;
    const numB = b.data.project_number ?? 0;
    return numB - numA;
  });

  const currentProject = projectArray.find(
    (project) => project.uid === activeProject
  )?.data;

  useEffect(() => {
    const chosenProject = projectArray.filter((project) =>
      pathname.includes(project.uid)
    );

    if (chosenProject[0]) {
      setActiveProject(chosenProject[0].uid);
    }
  }, [pathname, projectArray]);

  return (
    <div className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.listContainer}>
          <div className={styles.scrollContainer}>
            {sortedArray.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className={styles.listComponent}
                onClick={() => {
                  setActiveProject(project.uid);
                  router.push(`/projects/${project.uid}`);
                  type TitleType = { text: string };
                  const titleText = (project.data.title[0] as TitleType).text;
                  window.sa_event?.(`project_${titleText}`);
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
        <ImageContainer
          currentProject={currentProject}
          activeProject={activeProject}
        />
      </section>
    </div>
  );
}
