'use client';

import React from 'react';

import styles from './LegalContent.module.css';
import { LegalDocument } from '../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import { isLegalVisibleStore } from '@/app/stores/IsLegalVisible';
import { PrismicNextLink } from '@prismicio/next';
import Arrow from '../SvgComponents/Arrow/Arrow';

type Props = {
  legal: LegalDocument;
};

export default function LegalContent({ legal }: Props) {
  const { isLegalVisible, setIsLegalVisible } = isLegalVisibleStore();

  return (
    <div className={`${styles.main} ${isLegalVisible ? styles.visible : ''}`}>
      <div className={styles.wrapper}>
        <div
          className={styles.crosscontainer}
          onClick={() => setIsLegalVisible(!isLegalVisible)}
        >
          <div className={styles.cross}>
            <div></div> <div></div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.impressum}>
              <div className={styles.titlecontainer}>
                <PrismicRichText field={legal.data.title} />
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}
              >
                <PrismicNextLink field={legal.data.agb_download} />
                <div>
                  <div style={{ transform: ' translateY(2px) rotate(-45deg)' }}>
                    <Arrow height="12" />
                  </div>
                </div>
              </div>
              {legal.data.categories.map((item, index) => (
                <div key={index} className={styles.category}>
                  <PrismicRichText field={item.subtitle} />
                  <div>
                    <PrismicRichText field={item.text} />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.legal}>
              <PrismicRichText field={legal.data.privacy_title} />
              {legal.data.privacy_group.map((item, index) => (
                <div key={index} className={styles.category}>
                  <PrismicRichText field={item.privacy_subtitle} />
                  <div>
                    <PrismicRichText field={item.privacy_text} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
