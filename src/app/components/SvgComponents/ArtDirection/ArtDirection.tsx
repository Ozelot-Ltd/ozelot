import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function ArtDirection({}) {
  const { artDirectionIcon } = useContents();

  return <PrismicNextImage field={artDirectionIcon.data.icon} />;
}
