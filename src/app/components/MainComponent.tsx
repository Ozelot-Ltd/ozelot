'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './MainComponent.module.css';
import { GroupField } from '@prismicio/client';
import { Simplify } from '../../../prismicio-types';
import { useRouter, usePathname } from 'next/navigation';
import {
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem,
} from '../../../prismicio-types';
import Logo from './SvgComponents/Logo/Logo';
import { PrismicNextImage } from '@prismicio/next';
import ProjectsComponent from './SectionComponents/ProjectsComponent/ProjectsComponent';
import StudioComponent from './SectionComponents/StudioComponent/StudioComponent';
import ContactComponent from './SectionComponents/ContactComponent/ContactComponent';
import RecordsComponent from './SectionComponents/RecordsComponent/RecordsComponent';
import ServicesComponent from './SectionComponents/ServicesComponent/ServicesComponent';
import AIPopup from './AIPopup/AIPopup';

import { isClickedStore } from '../stores/IsClickedStore';

import { useMobile } from '../../../context/MobileContext';
import MobileComponent from './Mobile/MobileComponent';

interface ColumnProps {
  item:
    | SettingsDocumentDataNavigationItemsLeftItem
    | SettingsDocumentDataNavigationItemsRightItem
    | undefined;
  side: string;
  isActive: boolean;
  transitionEnd: boolean;
  onClick: () => void;
  setTransitionEnd: (value: boolean) => void;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({
  item,
  isActive,
  onClick,
  setTransitionEnd,
  children,
}) => {
  const itemId = item?.navigation_link.text?.toLowerCase();

  return (
    <div
      className={`${itemId === 'services' ? styles.bar : styles.column} ${itemId !== 'services' && isActive ? styles.fullWidth : ''} ${isActive && itemId === 'services' ? styles.fullHeight : ''} `}
      id={itemId}
    >
      <div
        className={styles.columnContent}
        onClick={onClick}
        onTransitionEnd={() => setTransitionEnd(true)}
        onTransitionStart={() => setTransitionEnd(false)}
      >
        <p className={styles.navText}>{item?.navigation_link.text}</p>
        {itemId !== 'services' && (
          <PrismicNextImage field={item?.navigation_icon} />
        )}
      </div>
      <div className={styles.section}>
        <div className={styles.content} data-content={itemId}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function MainComponent({
  left,
  right,
}: {
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isClicked, setIsClicked } = isClickedStore();
  const [side, setSide] = useState<'left' | 'right' | 'bottom' | ''>('');
  const [transitionEnd, setTransitionEnd] = useState(false);
  const [isProjectsActive, setIsProjectsActive] = useState(false);
  const [isStudioActive, setIsStudioActive] = useState(false);
  const [isRecordsActive, setIsRecordsActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [isServicesActive, setIsServicesActive] = useState(false);
  const { isDesktop } = useMobile();
  const [showPopup, setShowPopup] = useState(false);

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

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setTimeout(() => {
        setShowPopup(true);
      }, 1000);
    }
  }, [pathname]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        document.documentElement.style.setProperty(
          '--container-width',
          `${width}px`
        );
      }
    };

    updateContainerWidth();
  }, []);

  useEffect(() => {
    if (pathname.includes('projects')) {
      setIsClicked('projects');
      setSide('left');
    } else if (pathname.includes('studio')) {
      setIsClicked('studio');
      setSide('left');
    } else if (pathname.includes('records')) {
      setIsClicked('records');
      setSide('right');
    } else if (pathname.includes('contact')) {
      setIsClicked('contact');
      setSide('right');
    } else if (pathname.includes('services')) {
      setIsClicked('services');
      setSide('bottom');
    }
  }, [pathname]);

  const handleClick = (
    text: string | undefined | null,
    clickedSide: 'left' | 'right' | 'bottom'
  ) => {
    if (!text) return;
    const lowercaseText = text.toLowerCase();

    // If already in transition, don't allow new clicks
    if (!transitionEnd && isClicked !== '') {
      return;
    }

    // Closing current section
    if (isClicked === lowercaseText) {
      setIsClicked('');
      setSide('');
      router.push('/');
    }
    // Opening a new section (but wait if any transition is in progress)
    else {
      if (isClicked === 'services' && lowercaseText !== 'services') {
        // First close services
        setIsClicked('');
        setSide('');

        setTimeout(() => {
          setIsClicked(lowercaseText);
          setSide(clickedSide);
          router.push(`/${lowercaseText}`);
        }, 500);
      } else if (isClicked !== '' && lowercaseText === 'services') {
        setIsClicked('');
        setSide('');

        setTimeout(() => {
          setIsClicked(lowercaseText);
          setSide(clickedSide);
          router.push(`/${lowercaseText}`);
        }, 500);
      } else {
        setIsClicked(lowercaseText);
        setSide(clickedSide);
        router.push(`/${lowercaseText}`);
      }
    }
  };
  return (
    <>
      {isDesktop ? (
        <div className={styles.container}>
          {showPopup && <AIPopup />}
          <div className={styles.logoContainer}>
            <div
              onClick={() => {
                setIsClicked('');
                setSide('');
                router.push('/');
              }}
              className={`${styles.logo} ${isClicked !== '' ? styles.animate : ''}`}
            >
              <Logo height={'28'} />
            </div>
          </div>

          {/* Left navigation */}

          {/********* Studio ***********/}

          <div className={`${styles.nav} ${styles.left}`} ref={containerRef}>
            <Column
              item={left[0]}
              side="left"
              isActive={
                isClicked === left[0]?.navigation_link.text?.toLowerCase() &&
                side === 'left'
              }
              onClick={() => handleClick(left[0]?.navigation_link.text, 'left')}
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <StudioComponent
                isStudioActive={isStudioActive}
                transitionEnd={transitionEnd}
              />
            </Column>

            {/************ Projects ************/}

            <Column
              item={left[1]}
              side="left"
              isActive={
                isClicked === left[1]?.navigation_link.text?.toLowerCase() &&
                side === 'left'
              }
              onClick={() => handleClick(left[1]?.navigation_link.text, 'left')}
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <ProjectsComponent
                isProjectsActive={isProjectsActive}
                transitionEnd={transitionEnd}
              />
            </Column>
          </div>

          {/* Right navigation */}

          {/************ Records ************/}

          <div className={`${styles.nav} ${styles.right}`}>
            <Column
              item={right[0]}
              side="right"
              isActive={
                isClicked === right[0]?.navigation_link.text?.toLowerCase() &&
                side === 'right'
              }
              onClick={() =>
                handleClick(right[0]?.navigation_link.text, 'right')
              }
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <RecordsComponent
                isRecordsActive={isRecordsActive}
                transitionEnd={transitionEnd}
              />
            </Column>

            {/************ Contact ************/}

            <Column
              item={right[1]}
              side="right"
              isActive={
                isClicked === right[1]?.navigation_link.text?.toLowerCase() &&
                side === 'right'
              }
              onClick={() =>
                handleClick(right[1]?.navigation_link.text, 'right')
              }
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <ContactComponent
                isContactActive={isContactActive}
                transitionEnd={transitionEnd}
              />
            </Column>
          </div>

          {/************ Services ************/}

          <div
            className={`${styles.nav} ${styles.services} ${isClicked === 'services' ? styles.background : ''}`}
          >
            <Column
              item={right[2]}
              side="bottom"
              isActive={
                isClicked === right[2]?.navigation_link.text?.toLowerCase() &&
                side === 'bottom'
              }
              onClick={() =>
                handleClick(right[2]?.navigation_link.text, 'bottom')
              }
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <ServicesComponent
                isServicesActive={isServicesActive}
                transitionEnd={transitionEnd}
              />
            </Column>
          </div>
        </div>
      ) : (
        <MobileComponent left={left} right={right} />
      )}
    </>
  );
}
