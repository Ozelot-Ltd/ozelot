'use client';

import { useState, useEffect } from 'react';

import styles from '../../RecordsComponent/RecordComponent/RecordComponent.module.css';

import { useContents } from '@/context/ContentContext';

import ImageComponent from '../../RecordsComponent/ImageComponent/ImageComponent';
import Project from './components/Project';
import DescriptionComponent from '../../RecordsComponent/DescriptionComponent/DescriptionComponent';

import { useRouter, usePathname } from 'next/navigation';
import { ProjectDocument } from '@/prismicio-types';

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

  const placeholderURL =
    'https://res.cloudinary.com/ddkwj78mq/video/upload/v1759222722/websitevideo_compressed_ilku8j.mp4';

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
        <div className={styles.imageContainer}>
          {!currentProject && (
            <div
              className={styles.previewContainer}
              style={{ pointerEvents: 'none' }}
            >
              <video
                src={`${placeholderURL}`}
                controls={false}
                autoPlay
                loop
                muted
                playsInline
                className={styles.sliderVideoProject}
              />
            </div>
          )}
          {currentProject && (
            <ImageComponent
              key={activeProject as string}
              currentProject={currentProject}
            />
          )}
        </div>
      </section>
    </div>
  );
}
