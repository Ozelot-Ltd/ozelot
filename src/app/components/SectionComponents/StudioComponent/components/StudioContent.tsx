'use client';

import React from 'react';

import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import styles from './StudioContent.module.css';

type Props = {
  isStudioActive: boolean;
  transitionEnd: boolean;
};

export default function StudioContent({
  isStudioActive,
  transitionEnd,
}: Props) {
  const { studio } = useContents();

  const data = studio.data;

  console.log(isStudioActive, transitionEnd);
  return (
    <div>
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
          <div className={styles.rightContainer}></div>
        </div>{' '}
        <div className={styles.lowerContainer}>
          <div className={styles.marqueeContainer}></div>
        </div>
      </div>
    </div>
  );
}
