'use client';

import React from 'react';

import RecordsComponent from '../../SectionComponents/RecordsComponent/RecordsComponent';
import ServicesComponent from '../../SectionComponents/ServicesComponent/ServicesComponent';
import ProjectsComponent from '../../SectionComponents/ProjectsComponent/ProjectsComponent';
import StudioComponent from '../../SectionComponents/StudioComponent/StudioComponent';
import ContactComponent from '../../SectionComponents/ContactComponent/ContactComponent';

type MobileContentProps = {
  isRecordsActive: boolean;
  isProjectsActive?: boolean;
  isStudioActive?: boolean;
  isContactActive?: boolean;
  isServicesActive?: boolean;
  transitionEnd?: boolean;
};

export default function MobileContent({
  isRecordsActive,
  isProjectsActive,
  isStudioActive,
  isContactActive,
  isServicesActive,
  transitionEnd,
}: MobileContentProps) {
  return (
    <>
      {isRecordsActive && (
        <RecordsComponent
          isRecordsActive={isRecordsActive}
          transitionEnd={transitionEnd}
        />
      )}

      {isProjectsActive && (
        <ProjectsComponent
          isProjectsActive={isProjectsActive}
          transitionEnd={transitionEnd}
        />
      )}
      {isStudioActive && (
        <StudioComponent
          isStudioActive={isStudioActive}
          transitionEnd={transitionEnd}
        />
      )}
      {isContactActive && (
        <ContactComponent
          isContactActive={isContactActive}
          transitionEnd={transitionEnd}
        />
      )}
      {isServicesActive && (
        <ServicesComponent
          isServicesActive={isServicesActive}
          transitionEnd={transitionEnd}
        />
      )}
    </>
  );
}
