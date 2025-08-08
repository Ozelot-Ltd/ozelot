'use client';

import React, { useState } from 'react';

import styles from '../../RecordsComponent/RecordComponent/RecordComponent.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import ImageComponent from '../../RecordsComponent/ImageComponent/ImageComponent';
import Project from './components/Project';
import DescriptionComponent from '../../RecordsComponent/DescriptionComponent/DescriptionComponent';
import FadeIn from '@/app/components/FadeIn/FadeIn';

export default function ProjectComponent() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { projectArray, servicesOffered } = useContents();
  const [activeProject, setActiveProject] = useState('');
  const [filter, setFilter] = useState('all');

  const sortedArray = projectArray.sort((a, b) => {
    const numA = a.data.project_number ?? 0;
    const numB = b.data.project_number ?? 0;
    return numB - numA;
  });

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
            <div
              className={styles.previewContainer}
              style={{ pointerEvents: 'none' }}
            >
              <iframe
                width="464"
                height="824"
                src="https://www.youtube.com/embed/feDFrm5b2R0?autoplay=1&loop=1&playlist=feDFrm5b2R0&mute=1"
                title="Quality Test"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  scale: '1.2',
                  borderRadius: '8px',
                  pointerEvents: 'none',
                  border: 'none',
                  outline: 'none',
                }}
              ></iframe>
            </div>
          )}
          {currentProject && <ImageComponent currentProject={currentProject} />}
        </div>
      </section>
    </div>
  );
}
