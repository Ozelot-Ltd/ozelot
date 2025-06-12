'use client';

import React from 'react';

import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import styles from './StudioContent.module.css';
import { PrismicNextImage } from '@prismicio/next';
import SocialBar from '../../ContactComponent/components/SocialBar';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import LegalButton from '@/app/components/LegalButton/LegalButton';

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.upperContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.titleContainer}>
              <h2>ABOUT</h2>
              <h2>OZELOT STUDIOS</h2>
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
            </div>{' '}
            <LegalButton />
            <SocialBar />
          </div>
          <div className={styles.rightContainer}>
            {data.marquee_upper.map((item, index) => (
              <FadeIn key={index} multiplier={0.1} delay={index} yDown={200}>
                <PrismicNextImage key={index} field={item.image} />
              </FadeIn>
            ))}
            {data.marquee_lower.map((item, index) => (
              <FadeIn key={index} multiplier={0.15} delay={index} yDown={200}>
                <PrismicNextImage key={index} field={item.image} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>{' '}
    </div>
  );
}
