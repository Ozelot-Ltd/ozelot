import React from 'react';

import styles from './LegalContent.module.css';
import { LegalDocument } from '../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

type Props = {
  legal: LegalDocument;
};

export default function LegalContent({ legal }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.impressum}>
          <PrismicRichText field={legal.data.title} />
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
  );
}
