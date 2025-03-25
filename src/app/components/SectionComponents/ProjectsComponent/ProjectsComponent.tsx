import React from 'react';
import MainContainer from '../MainContainer';

import ProjectComponent from './ProjectComponent/ProjectComponent';

export default function ProjectsComponent({
  isProjectsActive,
  transitionEnd,
}: {
  isProjectsActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <MainContainer>
      {isProjectsActive && transitionEnd && (
        <ProjectComponent
          isProjectsActive={isProjectsActive}
          transitionEnd={transitionEnd}
        />
      )}
    </MainContainer>
  );
}
