import React from 'react';

import { useContents } from '../../../../context/ContentContext';
import LegalContent from './LegalContent';

export default function LegalComponent() {
  const { legal } = useContents();

  return <LegalContent legal={legal} />;
}
