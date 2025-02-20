import React from 'react';
import MainContainer from '../MainContainer';

export default function ProjectsComponent({
  isProjectsActive,
  transitionEnd,
}: {
  isProjectsActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <MainContainer>
      {isProjectsActive && transitionEnd && 'KLELELLKEJKFLJKL'}{' '}
    </MainContainer>
  );
}
