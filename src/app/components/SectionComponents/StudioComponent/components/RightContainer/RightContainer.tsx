import React from 'react';

import styles from './RightContainer.module.css';

import { useContents } from '../../../../../../../context/ContentContext';
import { PrismicNextImage } from '@prismicio/next';

import Marquee from 'react-fast-marquee';

export default function RightContainer() {
  const { studio } = useContents();
  const data = studio.data;

  const upper = data.marquee_upper;
  const lower = data.marquee_lower;

  return (
    <div className={styles.rightContainer}>
      <div className={styles.marquee}>
        <Marquee speed={50} direction="right" autoFill={true}>
          {upper.map((item, index) => (
            <PrismicNextImage key={index} field={item.image} />
          ))}
        </Marquee>
      </div>
      <div className={styles.marquee}>
        <Marquee gradientColor="var(--black" speed={50}>
          {lower.map((item, index) => (
            <PrismicNextImage key={index} field={item.image} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
