'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './MainComponent.module.css';
import { GroupField } from '@prismicio/client';
import { Simplify } from '../../../prismicio-types';

import { useRouter, usePathname } from 'next/navigation';

import { useContents } from '../../../context/ContentContext';

import {
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem,
} from '../../../prismicio-types';

import Logo from './Logo/Logo';
import { PrismicNextImage } from '@prismicio/next';

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

  const projects = useContents().contentProps[1];

  console.log(projects);

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
    }
  }, [pathname]);

  useEffect(() => {
    if (isClicked === 'projects') {
      router.push('/projects');
    } else if (isClicked === 'about') {
      router.push('/about');
    }
  }, [isClicked, router]);

  const handleClick = (
    text: string | undefined | null,
    clickedSide: 'left' | 'right'
  ) => {
    if (!text) return;

    if (isClicked === text.toLowerCase() && side === clickedSide) {
      setIsClicked('');
      setSide('');
      router.push('/');
    } else {
      setIsClicked(text.toLowerCase());
      setSide(clickedSide);
      router.push(`/${text.toLowerCase()}`);
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
        <Logo height={'40'} />
      </div>
      <div className={`${styles.nav} ${styles.left}`} ref={containerRef}>
        {left.map((item, index) => {
          return (
            <div
              className={`${styles.column} ${
                isClicked === item.navigation_link.text?.toLowerCase() &&
                side === 'left'
                  ? styles.fullWidth
                  : ''
              }`}
              key={index}
              id={item.navigation_link.text?.toLowerCase()}
            >
              <div
                className={styles.columnContent}
                onClick={() => {
                  handleClick(item.navigation_link.text, 'left');
                }}
                onTransitionEnd={() => {
                  setTransitionEnd(true);
                }}
              >
                <p>{item.navigation_link.text}</p>
                <PrismicNextImage field={item.navigation_icon} />
              </div>
              <div className={styles.section}>
                <h1
                  id={item.navigation_link.text?.toLowerCase()}
                  className={`${styles.sectionHeading} ${transitionEnd && isClicked ? styles.visible : ''}`}
                >
                  TESTTEST
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${styles.nav} ${styles.right}`}>
        {right.map((item, index) => {
          return (
            <div
              className={`${styles.column} ${
                isClicked === item.navigation_link.text?.toLowerCase() &&
                side === 'right'
                  ? styles.fullWidth
                  : ''
              }`}
              key={index}
              id={item.navigation_link.text?.toLowerCase()}
            >
              <div
                className={styles.columnContent}
                onClick={() => handleClick(item.navigation_link.text, 'right')}
              >
                <p>{item.navigation_link.text}</p>
                <PrismicNextImage field={item.navigation_icon} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
