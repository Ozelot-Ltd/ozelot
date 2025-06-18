import React, { Dispatch, SetStateAction, useEffect } from 'react';

// import ProjectsComponent from './SectionComponents/ProjectsComponent/ProjectsComponent';
// import StudioComponent from './SectionComponents/StudioComponent/StudioComponent';
// import ContactComponent from './SectionComponents/ContactComponent/ContactComponent';
// import RecordsComponent from './SectionComponents/RecordsComponent/RecordsComponent';
// import ServicesComponent from './SectionComponents/ServicesComponent/ServicesComponent';

import Logo from './SvgComponents/Logo/Logo';

import mobileStyles from './MobileComponent.module.css';
import styles from './MainComponent.module.css';

type Props = {
  isClicked?: string;
  setIsClicked: (value: string) => void;
  setSide: Dispatch<SetStateAction<'' | 'left' | 'right' | 'bottom'>>;
  router: {
    push: (path: string) => void;
  };
  setIsProjectsActive: Dispatch<SetStateAction<boolean>>;
  setIsStudioActive: Dispatch<SetStateAction<boolean>>;
  setIsRecordsActive: Dispatch<SetStateAction<boolean>>;
  setIsContactActive: Dispatch<SetStateAction<boolean>>;
  setIsServicesActive: Dispatch<SetStateAction<boolean>>;
};

export default function MobileComponent({
  isClicked = '',
  setIsClicked,
  setSide,
  router,
  setIsProjectsActive,
  setIsStudioActive,
  setIsRecordsActive,
  setIsContactActive,
  setIsServicesActive,
}: Props) {
  useEffect(() => {
    if (isClicked === 'projects') {
      setIsProjectsActive(true);
      setIsStudioActive(false);
      setIsRecordsActive(false);
      setIsContactActive(false);
      setIsServicesActive(false);
    } else if (isClicked === 'studio') {
      setIsProjectsActive(false);
      setIsStudioActive(true);
      setIsRecordsActive(false);
      setIsContactActive(false);
      setIsServicesActive(false);
    } else if (isClicked === 'records') {
      setIsProjectsActive(false);
      setIsStudioActive(false);
      setIsRecordsActive(true);
      setIsContactActive(false);
      setIsServicesActive(false);
    } else if (isClicked === 'contact') {
      setIsProjectsActive(false);
      setIsStudioActive(false);
      setIsRecordsActive(false);
      setIsContactActive(true);
      setIsServicesActive(false);
    } else if (isClicked === 'services') {
      setIsProjectsActive(false);
      setIsStudioActive(false);
      setIsRecordsActive(false);
      setIsContactActive(false);
      setTimeout(() => {
        setIsServicesActive(true);
      }, 1500);
    }
  }, [isClicked]);

  return (
    <div className={mobileStyles.main}>
      <div className={mobileStyles.logocontainer}>
        <div
          onClick={() => {
            setIsClicked('');
            setSide('');
            router.push('/');
          }}
          className={`${styles.logo} ${isClicked !== '' ? styles.animate : ''}`}
        >
          <Logo height={'32'} />
        </div>
      </div>
    </div>
  );
}
