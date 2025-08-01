'use client';

import React from 'react';

import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import styles from './StudioContent.module.css';
import { PrismicNextImage } from '@prismicio/next';
import SocialBar from '../../ContactComponent/components/SocialBar';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import LegalButton from '@/app/components/LegalButton/LegalButton';
import LegalComponent from '@/app/components/LegalComponent/LegalComponent';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import { useRouter } from 'next/navigation';

type Props = {
  isStudioActive?: boolean;
  transitionEnd?: boolean;
};

export default function StudioContent({}: Props) {
  const { studio } = useContents();

  const data = studio.data;

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {' '}
        <LegalComponent />
        <div className={styles.upperContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.titleContainer}>
              <PrismicRichText field={data.subtitle} />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.descriptionContainer}>
                <PrismicRichText field={data.ozelot_description} />
              </div>
              <div className={styles.addressContainer}>
                <p
                  onClick={() => {
                    router.push('/contact');
                  }}
                >
                  {data.contact_link.text}
                  <Arrow height="12" />
                </p>
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <SocialBar /> <LegalButton />
            </div>
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
