import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function ThreeD({}) {
  const { threeDIcon } = useContents();

  return <PrismicNextImage field={threeDIcon.data.icon} />;
}
