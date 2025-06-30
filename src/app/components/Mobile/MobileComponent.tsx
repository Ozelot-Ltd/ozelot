'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';

// import ProjectsComponent from './SectionComponents/ProjectsComponent/ProjectsComponent';
// import StudioComponent from './SectionComponents/StudioComponent/StudioComponent';
// import ContactComponent from './SectionComponents/ContactComponent/ContactComponent';
// import RecordsComponent from './SectionComponents/RecordsComponent/RecordsComponent';
// import ServicesComponent from './SectionComponents/ServicesComponent/ServicesComponent';

import Logo from '../SvgComponents/Logo/Logo';

import mobileStyles from './MobileComponent.module.css';
import styles from '../MainComponent.module.css';
import MobileNavigation from './MobileNavigation/MobileNavigation';

import MobileContent from './MobileContent/MobileContent';

import MobileMenu from './MobileMenu/MobileMenu';

type Props = {
  isClicked?: string;
  setIsClicked: (value: string) => void;
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
  router,
}: Props) {
  const [isNavigationActive, setIsNavigationActive] = useState(false);

  return (
    <div className={mobileStyles.main}>
      <div className={mobileStyles.logocontainer}>
        <div
          onClick={() => {
            setIsClicked('');
            if (isNavigationActive) {
              setIsNavigationActive(false);
            }
            router.push('/');
          }}
          className={`${styles.logo} ${isClicked !== '' ? styles.animate : ''}`}
        >
          <Logo height={'32'} />
        </div>
      </div>
      <div
        className={mobileStyles.navigation}
        onClick={() => {
          setIsNavigationActive(!isNavigationActive);
          setIsClicked('');
        }}
      >
        <MobileNavigation
          isNavigationActive={isNavigationActive}
          setIsNavigationActive={setIsNavigationActive}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      </div>
      <div
        className={`${mobileStyles.menu} ${isNavigationActive && isClicked === '' ? mobileStyles.menuOpen : ''}`}
      >
        <MobileMenu
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          isNavigationActive={isNavigationActive}
          setIsNavigationActive={setIsNavigationActive}
        />
      </div>
      <div
        className={`${mobileStyles.content} ${isClicked !== '' ? mobileStyles.contentOpen : ''}`}
      >
        <MobileContent />
      </div>
    </div>
  );
}
