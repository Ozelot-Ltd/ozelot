'use client';

import React from 'react';

import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import styles from './StudioContent.module.css';
import { PrismicNextImage } from '@prismicio/next';

import { asText } from '@prismicio/client';
import Link from 'next/link';

type Props = {
  isStudioActive: boolean;
  transitionEnd: boolean;
};

export default function StudioContent({
  isStudioActive,
  transitionEnd,
}: Props) {
  const { studio, projectArray } = useContents();

  const data = studio.data;

  console.log(isStudioActive, transitionEnd);
  return (
    <div className={styles.fuckyomama}>
      <div className={styles.content}>
        <div className={styles.upperContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.titleContainer}>
              {data.description_group.map((item, index) => (
                <div key={index}>
                  <PrismicRichText field={item.title} />
                </div>
              ))}
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.descriptionContainer}>
                <PrismicRichText field={data.ozelot_description} />
              </div>
              <div className={styles.addressContainer}>
                <PrismicRichText field={data.address_name} />
                <PrismicRichText field={data.address_street} />
                <PrismicRichText field={data.address_zip} />
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            {data.marquee_upper.map((item, index) => (
              <PrismicNextImage key={index} field={item.image} />
            ))}
            {data.marquee_lower.map((item, index) => (
              <PrismicNextImage key={index} field={item.image} />
            ))}
          </div>
        </div>{' '}
        <div className={styles.lowerContainer}>
          <div className={styles.marqueeContainer}>
            {projectArray &&
              projectArray.map((item, index) => (
                <Link href={`/projects/${item.uid}`} key={index}>
                  <div>
                    <h3>{asText(item.data.title)}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
