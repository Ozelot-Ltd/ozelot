import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function GeneralIcon({}) {
  const { generalIcon } = useContents();

  return <PrismicNextImage field={generalIcon.data.icon} />;
}
