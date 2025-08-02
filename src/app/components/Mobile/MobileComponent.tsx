'use client';

import React, { useState, useEffect } from 'react';

import Logo from '../SvgComponents/Logo/Logo';

import mobileStyles from './MobileComponent.module.css';
import styles from '../MainComponent.module.css';
import MobileNavigation from './MobileNavigation/MobileNavigation';

import MobileContent from './MobileContent/MobileContent';

import { useRouter, usePathname } from 'next/navigation';

import MobileMenu from './MobileMenu/MobileMenu';
import { GroupField } from '@prismicio/client';
import {
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem,
  Simplify,
} from '../../../../prismicio-types';
import AIPopup from '../AIPopup/AIPopup';

export default function MobileComponent({
  left,
  right,
}: {
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
}) {
  const [isNavigationActive, setIsNavigationActive] = useState(false);
  const [isClicked, setIsClicked] = useState<string>('');
  const [isRecordsActive, setIsRecordsActive] = useState(false);
  const [isProjectsActive, setIsProjectsActive] = useState(false);
  const [isStudioActive, setIsStudioActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [isServicesActive, setIsServicesActive] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
      setIsServicesActive(true);
    }
  }, [isClicked]);

  useEffect(() => {
    if (pathname === '/') {
      setIsClicked('');
      setIsProjectsActive(false);
      setIsStudioActive(false);
      setIsRecordsActive(false);
      setIsContactActive(false);
      setIsServicesActive(false);
    } else if (pathname.includes('/projects')) {
      setIsClicked('projects');
    } else if (pathname.includes('/studio')) {
      setIsClicked('studio');
    } else if (pathname.includes('/records')) {
      setIsClicked('records');
    } else if (pathname.includes('/contact')) {
      setIsClicked('contact');
    } else if (pathname.includes('/services')) {
      setIsClicked('services');
    }
  }, [pathname]);

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
        onTransitionEnd={() => setTransitionEnd(true)}
        className={`${mobileStyles.menu} ${isNavigationActive && isClicked === '' ? mobileStyles.menuOpen : ''}`}
      >
        <MobileMenu
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          isNavigationActive={isNavigationActive}
          setIsNavigationActive={setIsNavigationActive}
          setIsProjectsActive={setIsProjectsActive}
          setIsStudioActive={setIsStudioActive}
          setIsRecordsActive={setIsRecordsActive}
          setIsContactActive={setIsContactActive}
          setIsServicesActive={setIsServicesActive}
          left={left}
          right={right}
        />
      </div>
      <div
        onTransitionEnd={() => setTransitionEnd(true)}
        className={`${mobileStyles.content} ${isClicked !== '' ? mobileStyles.contentOpen : ''}`}
      >
        <MobileContent
          isRecordsActive={isRecordsActive}
          isProjectsActive={isProjectsActive}
          isStudioActive={isStudioActive}
          isContactActive={isContactActive}
          isServicesActive={isServicesActive}
          transitionEnd={transitionEnd}
        />
      </div>
      <AIPopup />
    </div>
  );
}
