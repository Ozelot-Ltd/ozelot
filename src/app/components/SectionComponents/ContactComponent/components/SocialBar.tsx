import React from 'react';

import styles from './Contact.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

export default function SocialBar() {
  const { socialBar } = useContents();
  return (
    <div className={styles.socials}>
      {socialBar.data.socials.map((item, index) => (
        <div key={index} className={styles.social}>
          <PrismicNextLink field={item.link}>
            <PrismicNextImage field={item.icon} />
          </PrismicNextLink>
        </div>
      ))}
    </div>
  );
}
