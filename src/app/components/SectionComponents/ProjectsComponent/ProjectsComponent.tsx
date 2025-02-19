import React from 'react';

export default function ProjectsComponent({
  isProjectsActive,
  transitionEnd,
}: {
  isProjectsActive: boolean;
  transitionEnd: boolean;
}) {
  return <div>{isProjectsActive && transitionEnd && 'KLELELLKEJKFLJKL'} </div>;
}
