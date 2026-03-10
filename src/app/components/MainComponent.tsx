'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './MainComponent.module.css';
import { GroupField } from '@prismicio/client';
import {
  Simplify,
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem
} from '@/prismicio-types';
import { useRouter, usePathname } from 'next/navigation';

import Logo from './SvgComponents/Logo/Logo';
import ProjectsComponent from './SectionComponents/ProjectsComponent/ProjectsComponent';
import StudioComponent from './SectionComponents/StudioComponent/StudioComponent';
import ContactComponent from './SectionComponents/ContactComponent/ContactComponent';
import RecordsComponent from './SectionComponents/RecordsComponent/RecordsComponent';
import ServicesComponent from './SectionComponents/ServicesComponent/ServicesComponent';

import { isClickedStore } from '@/stores/IsClickedStore';

import { useMobile } from '@/context/MobileContext';
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
  children
}) => {
  const itemId = item?.navigation_link.text?.toLowerCase();

  return (
    <div
      className={`${itemId === 'records' ? styles.bar : styles.column} ${itemId !== 'records' && isActive ? styles.fullWidth : ''} ${isActive && itemId === 'records' ? styles.fullHeight : ''} `}
      id={itemId}
    >
      <div
        className={styles.columnContent}
        onClick={onClick}
        onTransitionEnd={() => setTransitionEnd(true)}
        onTransitionStart={() => setTransitionEnd(false)}
      >
        <p className={styles.navText}>{item?.navigation_link.text}</p>
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
  right
}: {
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isClicked, setIsClicked } = isClickedStore();
  const [side, setSide] = useState<'left' | 'right' | 'bottom' | ''>('');
  const [transitionEnd, setTransitionEnd] = useState(false);
  const { isDesktop } = useMobile();
  const router = useRouter();
  const pathname = usePathname();

  const isProjectsActive = isClicked === 'projects';
  const isStudioActive = isClicked === 'studio';
  const isRecordsActive = isClicked === 'records';
  const isContactActive = isClicked === 'contact';
  const isServicesActive = isClicked === 'services';

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
    } else if (pathname.includes('services')) {
      setIsClicked('services');
      setSide('right');
    } else if (pathname.includes('contact')) {
      setIsClicked('contact');
      setSide('right');
    } else if (pathname.includes('records')) {
      setIsClicked('records');
      setSide('bottom');
    }
  }, [pathname, setIsClicked]);

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
    window.sa_event?.(`main_navigation_${text.toLowerCase()}`);
    // Closing current section
    if (isClicked === lowercaseText) {
      setIsClicked('');
      setSide('');
      router.push('/');
    }
    // Opening a new section (but wait if any transition is in progress)
    else {
      if (isClicked === 'records' && lowercaseText !== 'records') {
        setIsClicked('');
        setSide('');

        setTimeout(() => {
          setIsClicked(lowercaseText);
          setSide(clickedSide);
          router.push(`/${lowercaseText}`);
        }, 500);
      } else if (isClicked !== '' && lowercaseText === 'records') {
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
          <div className={styles.logoContainer}>
            <div
              onClick={() => {
                setIsClicked('');
                setSide('');
                router.push('/');
                window.sa_event?.(`main_navigation_logo}`);
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
              isActive={isClicked === 'services' && side === 'right'}
              onClick={() => handleClick('services', 'right')}
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <ServicesComponent
                isServicesActive={isServicesActive}
                transitionEnd={transitionEnd}
              />
            </Column>

            {/************ Contact ************/}

            <Column
              item={right[1]}
              side="right"
              isActive={isClicked === 'contact' && side === 'right'}
              onClick={() => handleClick('contact', 'right')}
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
            className={`${styles.nav} ${styles.servicesBar} ${isClicked === 'records' ? styles.background : ''}`}
          >
            <Column
              item={right[2]}
              side="bottom"
              isActive={isClicked === 'records' && side === 'bottom'}
              onClick={() => handleClick('records', 'bottom')}
              transitionEnd={transitionEnd}
              setTransitionEnd={setTransitionEnd}
            >
              <RecordsComponent
                isRecordsActive={isRecordsActive}
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
