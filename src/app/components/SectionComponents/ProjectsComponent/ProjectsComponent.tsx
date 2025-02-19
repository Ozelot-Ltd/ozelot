import React from 'react';

export default function ProjectsComponent({
  isProjectsActive,
}: {
  isProjectsActive: boolean;
}) {
  console.log(isProjectsActive);
  return <div>ProjectsComponent</div>;
}
