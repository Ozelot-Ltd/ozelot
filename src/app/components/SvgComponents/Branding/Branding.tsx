import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function Branding({}) {
  const { brandingIcon } = useContents();

  return <PrismicNextImage field={brandingIcon.data.icon} />;
}
