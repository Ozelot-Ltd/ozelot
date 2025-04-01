import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function AIIcon({}) {
  const { aIIcon } = useContents();

  return <PrismicNextImage field={aIIcon.data.icon} />;
}
