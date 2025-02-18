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
import Logo from './Logo/Logo';
import { PrismicNextImage } from '@prismicio/next';

import ProjectsComponent from './ProjectsComponent/ProjectsComponent';

export default function MainComponent({
  left,
  right,
}: {
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState('');
  const [side, setSide] = useState<'left' | 'right' | ''>('');
  const [transitionEnd, setTransitionEnd] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

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
    }
  }, [pathname]);

  const handleClick = (
    text: string | undefined | null,
    clickedSide: 'left' | 'right'
  ) => {
    if (!text) return;
    const lowercaseText = text.toLowerCase();

    if (isClicked === lowercaseText && side === clickedSide) {
      setIsClicked('');
      setSide('');
      router.push('/');
    } else {
      setIsClicked(lowercaseText);
      setSide(clickedSide);
      router.push(`/${lowercaseText}`);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.logoContainer}
        onClick={() => {
          setIsClicked('');
          setSide('');
          router.push('/');
        }}
      >
        <div
          className={`${styles.logo} ${isClicked !== '' ? styles.animate : ''}`}
        >
          <Logo height={'40'} />
        </div>
      </div>
      <div className={`${styles.nav} ${styles.left}`} ref={containerRef}>
        {left.map((item, index) => {
          const itemId = item.navigation_link.text?.toLowerCase();
          return (
            <div
              className={`${styles.column} ${
                isClicked === itemId && side === 'left' ? styles.fullWidth : ''
              }`}
              key={index}
              id={itemId}
            >
              <div
                className={styles.columnContent}
                onClick={() => {
                  handleClick(item.navigation_link.text, 'left');
                }}
                onTransitionEnd={() => {
                  setTransitionEnd(true);
                }}
                onTransitionStart={() => {
                  setTransitionEnd(false);
                }}
              >
                <p>{item.navigation_link.text}</p>
                <PrismicNextImage field={item.navigation_icon} />
              </div>
              <div className={styles.section}>
                <div
                  className={styles.content}
                  data-content={item.navigation_link.text?.toLowerCase()}
                >
                  {(() => {
                    const contentId = item.navigation_link.text?.toLowerCase();
                    const animationClass = `${styles.sectionHeading} ${
                      transitionEnd && isClicked ? styles.visible : ''
                    }`;

                    if (contentId === 'studio') {
                      return <h1 className={animationClass}>STUDIO</h1>;
                    }

                    if (contentId === 'projects') {
                      return (
                        <div className={animationClass}>
                          <ProjectsComponent />
                        </div>
                      );
                    }

                    return (
                      <h1 className={animationClass}>
                        {item.navigation_link.text?.toUpperCase()} CONTENT
                      </h1>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${styles.nav} ${styles.right}`}>
        {right.map((item, index) => {
          const itemId = item.navigation_link.text?.toLowerCase();

          return (
            <div
              className={`${styles.column} ${
                isClicked === itemId && side === 'right' ? styles.fullWidth : ''
              }`}
              key={index}
              id={itemId}
            >
              <div
                className={styles.columnContent}
                onClick={() => handleClick(item.navigation_link.text, 'right')}
                onTransitionEnd={() => {
                  setTransitionEnd(true);
                }}
              >
                <p>{item.navigation_link.text}</p>
                <PrismicNextImage field={item.navigation_icon} />
              </div>
              <div className={styles.section}>
                <div
                  className={styles.content}
                  data-content={item.navigation_link.text?.toLowerCase()}
                >
                  {(() => {
                    const contentId = item.navigation_link.text?.toLowerCase();
                    const animationClass = `${styles.sectionHeading} ${
                      transitionEnd && isClicked ? styles.visible : ''
                    }`;

                    if (contentId === 'studio') {
                      return <h1 className={animationClass}>STUDIO</h1>;
                    }

                    if (contentId === 'projects') {
                      return <h1 className={animationClass}>STUDIO</h1>;
                    }

                    return (
                      <h1 className={animationClass}>
                        {item.navigation_link.text?.toUpperCase()} CONTENT
                      </h1>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
