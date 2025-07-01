import React from 'react';

import { useContents } from '../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';

import styles from './Address.module.css';

export default function Address() {
  const { address } = useContents();
  return (
    <div className={styles.address}>
      <PrismicRichText field={address.data.title} />
      <PrismicRichText field={address.data.street} />
      <PrismicRichText field={address.data.zipcode} />
      <PrismicNextLink field={address.data.email} />
    </div>
  );
}
