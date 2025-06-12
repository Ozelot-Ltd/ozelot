'use client';

import React from 'react';

import styles from './LegalContent.module.css';
import { LegalDocument } from '../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import { isLegalVisibleStore } from '@/app/stores/IsLegalVisible';

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
