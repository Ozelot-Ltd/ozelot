import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function GraphicDesignIcon({}) {
  const { graphicDesignIcon } = useContents();

  return <PrismicNextImage field={graphicDesignIcon.data.icon} />;
}
