import React from 'react';

import styles from './SocialBar.module.css';

import { useContents } from '../../../../../../context/ContentContext';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import FadeIn from '@/app/components/FadeIn/FadeIn';

export default function SocialBar() {
  const { socialBar } = useContents();
  return (
    <FadeIn stylesProps={styles} delay={0.6}>
      {socialBar.data.socials.map((item, index) => (
        <div key={index}>
          <PrismicNextLink field={item.link}>
            <PrismicNextImage field={item.icon} />
          </PrismicNextLink>
        </div>
      ))}
    </FadeIn>
  );
}
