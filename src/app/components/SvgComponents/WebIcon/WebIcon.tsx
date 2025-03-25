import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function WebIcon({}) {
  const { webIcon } = useContents();

  return <PrismicNextImage field={webIcon.data.icon} />;
}
