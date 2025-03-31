import React from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { useContents } from '../../../../../context/ContentContext';

export default function SoundDesignIcon({}) {
  const { soundDesignIcon } = useContents();

  return <PrismicNextImage field={soundDesignIcon.data.icon} />;
}
